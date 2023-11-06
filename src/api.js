const HOST = "https://skypro-music-api.skyeng.tech/catalog/";

export async function getAllTracks() {
  const response = await fetch(`${HOST}track/all/`);

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  // console.log(data);
  return data;
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
