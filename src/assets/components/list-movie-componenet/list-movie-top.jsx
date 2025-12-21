// import { useEffect, useState } from "react";
// import instance from "../../utilites/api";
// import { data } from "react-router-dom";

// export function TopMovieCard({ page }) {
//   const [movie, setMovie] = useState({ data: [] });
//   let count = 0;
//   const arr = [];
//   async function getApi(page = 1) {
//     const respon = await instance.get(`movies?page=${page}`);
//     try {
//       setMovie(respon.data);
//       console.log(respon.data);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   function getTop(movie) {
//     movie.data.map(function ({ id, title, images }) {
//       const respon = instance.get(`movies/${id}`);

//       if (respon.data.imdb_rating > 8 && count < 3) {
//         arr.push(id, title, images);
//         count++;
//         console.log(arr);
//       }
//     });
//   }
//   useEffect(function () {
//     getApi(page);
//     getTop(movie);
//   }, []);
//   return( {arr.map(function ({id, title, images}) {
//     return (
//       <div>
//         <img src={images} />
//       </div>
//     );
//   })})
// }
