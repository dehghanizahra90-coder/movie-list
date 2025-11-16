import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import { ListMovie } from "../movie-list/list-film";
import { useParams } from "react-router-dom";
import style from "./single-page.style.module.css";

export function SingleMovie() {
  const { movie_id } = useParams();
  const [singleMovie, setSingleMovie] = useState([]);
  async function getApi() {
    try {
      const respon = await instance.get(`movies/${movie_id}`);
      setSingleMovie(respon.data);
      console.log(respon.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(
    function () {
      getApi();
    },
    [movie_id]
  );
  const {
    title,
    actors,
    box_office,
    country,
    dvd,
    director,
    imdb_id,
    poster,
    imdb_votes,
    user_cover,
    language,
    plot,
    writer,
    year,
    runtime,
    released,
    ratings,
    rated,
    awards,
    images = [],
  } = singleMovie;

  return (
    <Fragment>
      <div className={style.content}>
        <h1>Title:{title}</h1>
        <h2>Director:{director}</h2>
        <h2>Country:{country}</h2>
        <h2>Writer:{writer}</h2>
      </div>

      <img src={images[0]} />
    </Fragment>
  );
}
