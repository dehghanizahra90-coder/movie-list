import { useEffect, useState } from "react";
import instance from "../../utilites/api";
import style from "./list-movie-top.style.module.css";
import { useHoverShowInfo } from "../../Hook/hover-hook";
import { useGetApi } from "../../Hook/get-api-hook";
import { MovieHoverInfo } from "./movie-hover-info";
import { Link } from "react-router-dom";

export function TopMovieCard({ page }) {
  // const [movies, setMovie] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const { filmInfo, activeId, hoverShowInfo, setActiveId } = useHoverShowInfo();
  const { movies, getApi } = useGetApi();

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
    <ul className={style.row}>
      {topMovies.map(function ({ id, images }) {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`}>
              <div
                className={style.movieList}
                onMouseLeave={() => setActiveId(null)}
                onMouseEnter={() => hoverShowInfo(id)}
              >
                <img src={images[0]} className={style.img} />
                <div className="info">
                  {activeId === id && <MovieHoverInfo filmInfo={filmInfo} />}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
