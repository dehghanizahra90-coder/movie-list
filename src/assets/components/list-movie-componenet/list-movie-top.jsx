import { useEffect, useState } from "react";
import instance from "../../utilites/api";

export function TopMovieCard({ page }) {
  const [movies, setMovie] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  async function getApi(page) {
    const respon = await instance.get(`movies?page=${page}`);
    try {
      setMovie(respon.data.data);
      console.log(respon.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getTop(movies) {
    let topMovies = [];
    for (let i = 0; i < movies.length && topMovies.length < 3; i++)
      try {
        const request = await instance.get(`movies/${movies[i].id}`);
        if (request.data.imdb_rating > 8) {
          topMovies.push(request.data);
        }

        // const respon = await Promise.all(request);
        // console.log(respon);
        // const moviesData = respon.map((res) => res.data);
        // const topMovies = moviesData
        //   .filter((movie) => movie.imdb_rating > 8)
        //   .slice(0, 3)
        //   .map(function ({ id, title, images }) {
        //     arr.push({
        //       id: id,
        //       title: title,
        //       images: images,
        //     });
        //   });
        // console.log(topMovies);
        // setTopMovies(arr);
      } catch (e) {
        console.log("errrrror");
        console.log(e);
      }
    setTopMovies(topMovies);
  }

  useEffect(function () {
    getApi(page);
  }, []);
  useEffect(
    function () {
      getTop(movies);
    },
    [movies]
  );
  return (
    <div>
      {topMovies.map(function ({ id, title, images }) {
        return (
          <div key={id}>
            <div>hhhhhhhhh</div>
            <img src={images} alt={title} />
            <p>{title}</p>
          </div>
        );
      })}
    </div>
  );
}
