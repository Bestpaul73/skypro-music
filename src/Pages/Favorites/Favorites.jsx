import { useDispatch, useSelector } from 'react-redux'
import CenterBlockContent from '../../components/CenterBlockContent/CenterBlockContent'
import CenterBlockFilter from '../../components/CenterBlockFilter/CenterBlockFilter'
import CenterBlockSearch from '../../components/CenterBlockSearch/CenterBlockSearch'
import * as S from './Favorites.styles'
import { useContext, useEffect } from 'react'
import { loadingContext } from '../../Context'
import { getAllTracks } from '../../api'
import { setPlayList } from '../../store/playerSlice'
import { useGetFavoritesTracksQuery } from '../../store/api/tracksApi'

export const Favorites = () => {
  const dispatch = useDispatch()
  const { getTracksError, setGetTracksError } = useContext(loadingContext)
  const { loading, setLoading } = useContext(loadingContext)
  const isPlaying = useSelector((state) => state.playerApp.isPlaying)
  const searchString = useSelector((state) => state.playerApp.searchString)

  // const { favoritesTracks, isError } = useGetFavoritesTracksQuery()
  const { data, isLoading, error } = useGetFavoritesTracksQuery()

  // const handleGetFavoritesTracks = () => {
  //   if (isError) console.log(`Ошибка загрузки`)
  //   else {
  //     console.log('3')

  //     dispatch(setPlayList({ playList: favoritesTracks }))
  //     console.log('получили все треки')
  //     console.log(favoritesTracks)
  //   }

  //   // getAllTracks()
  //   //   .then((allTracks) => {
  //   //     dispatch(setPlayList({ playList: allTracks }))
  //   //     console.log('получили все треки')
  //   //     console.log(allTracks)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(`Ошибка загрузки`)
  //   //     setGetTracksError(error.message)
  //   //   })
  //   //   .finally(() => {
  //   //     setLoading(false)
  //   //     console.log(isPlaying)
  //   //   })
  // }

  const filterTracks = () => {
    if (data?.length) {
      let filteredTracks = [...data]

      if (searchString?.length) {
        filteredTracks = filteredTracks.filter((el) =>
          el.name.toLowerCase().includes(searchString.toLowerCase()),
        )
      }
      return filteredTracks
    }
    return []
  }

  const tracks = filterTracks()

  return (
    <>
      <CenterBlockSearch />
      <S.CenterBlockH2>Избранные треки</S.CenterBlockH2>
      <CenterBlockContent tracks={tracks} isLoading={isLoading} error={error} />
    </>
  )
}
