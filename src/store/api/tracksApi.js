import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deleteUser, setAuth } from '../userSlice'

// const HOST = 'https://skypro-music-api.skyeng.tech/'

const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**
   * fetchBaseQuery - это обертка от rtk-quert над fetch функцией
   * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
   *
   * fetchBaseQuery возвращает функцию, которую можно воспринимать как аналог fetch или axios функции.
   * то есть вызов "await baseQuery(...)" можно воспринимать как вызов "await fetch(...)"
   */
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/',
    // prepareHeaders - это часть api fetchBaseQuery, которая позволяет сформировать общие заголовки для всех запросов
    prepareHeaders: (headers, { getState }) => {
      // Мы достаем из стора access токен и прикрепляем его ко всем запросам, чтобы не пробрасывать токен в каждый запрос вручную
      // Мы находимся внутри callback функции, которая вызывается непосредственно перед каждым запросом,
      // таким образом все запросы всегда используют актуальный acces токен из redux стора
      const token = getState().auth.accessToken

      // Чтобы выключить отображение debug логов в консоли браузера, включите уровень Verbose\Debug в консоли разработчика
      console.debug('Использую токен из стора', { token })

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  })

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions)
  console.debug('Результат первого запроса', { result })

  // Если запрос выполнился не с 401 кодом, то все хорошо, просто отдаем результат запроса наружу
  if (result?.error?.status !== 401) {
    return result
  }

  // Ниже обрабатываем 401 код

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug('Принудительная авторизация!')
    api.dispatch(deleteUser())
    // window.location.href = 'http://localhost:3003/login'
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk query, она прилетает параметром запроса в функцию
  const { auth } = api.getState()
  console.debug('Данные пользователя в сторе', { auth })
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем, разлогиниваем его и отправляем авторизоваться руками
  if (!auth.refreshToken) {
    return forceLogout()
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: '/user/token/refresh/',
      method: 'POST',
      body: {
        refresh: auth.refreshToken,
      },
    },
    api,
    extraOptions,
  )

  console.debug('Результат запроса на обновление токена', { refreshResult })

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  // Апи может не вернуть новый access токен по разным причинам, например у нас неверный refresh токен или refresh токен протух (обычно refresh токены не протухаю, но бывает и такое)
  if (!refreshResult.data.access) {
    return forceLogout()
  }

  // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
  api.dispatch(setAuth({ accessToken: refreshResult.data.access, refreshToken: auth.refreshToken }))

  // Делаем повторный запрос с теми же параметрами что и исходный,
  // но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions)

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }

  console.debug('Повторный запрос завершился успешно')

  return retryResult
}

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  tagTypes: ['Likes'],

  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getAllTracks: build.query({
      query: () => `catalog/track/all/`,
      transformResponse: (response) => {
        let userId = localStorage.getItem('user')
        if (userId) {
          userId = JSON.parse(userId).id
        }

        const tracks = response.map((track) => {
          const user = track.stared_user.find((el) => el.id === userId)
          return {
            ...track,
            isLiked: !!user,
          }
        })

        return tracks
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Likes', id })),
              { type: 'Likes', id: 'LIST' },
            ]
          : [{ type: 'Likes', id: 'LIST' }],
    }),

    getFavoritesTracks: build.query({
      query: () => {
        const accessToken = localStorage.getItem('accessToken')
        return {
          url: `catalog/track/favorite/all/`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      },
      transformResponse: (response) => {
        const tracks = response.map((track) => {
          return {
            ...track,
            isLiked: true,
          }
        })

        return tracks
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Likes', id })),
              { type: 'Likes', id: 'LIST' },
            ]
          : [{ type: 'Likes', id: 'LIST' }],
    }),

    setLike: build.mutation({
      query: ({ id }) => {
        const accessToken = localStorage.getItem('accessToken')
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      },
      invalidatesTags: [{ type: 'Likes', id: 'LIST' }],
    }),

    setDisLike: build.mutation({
      query: ({ id }) => {
        const accessToken = localStorage.getItem('accessToken')
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      },
      invalidatesTags: [{ type: 'Likes', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllTracksQuery,
  useGetFavoritesTracksQuery,
  useSetLikeMutation,
  useSetDisLikeMutation,
} = tracksApi
