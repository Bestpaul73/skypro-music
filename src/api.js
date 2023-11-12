const HOST = 'https://skypro-music-api.skyeng.tech/'

export async function getAllTracks() {
  const response = await fetch(`${HOST}catalog/track/all/`)

  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }

  const data = await response.json()

  return data
}

export const userRegister = async ({ name, email, password }) => {
  return fetch(`${HOST}user/signup/`, {
    method: 'POST',
    body: JSON.stringify({
      username: name,
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      'content-type': 'application/json',
    },
  })
    .then((response) => {
      // console.log(response)

      if (response.status === 201) {
        return response.json()
      }
      if (response.status === 400) {
        // throw new Error(`Ошибка авторизации`);
        return response.json()
      }
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже')
      }
    })
}

// export async function postTodo(text) {
//   const response = await fetch("https://wedev-api.sky.pro/api/v2/todos", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method: "POST",
//     body: JSON.stringify({
//       text,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("Ошибка сервера");
//   }

//   const data = await response.json();
//   return data;
// }
