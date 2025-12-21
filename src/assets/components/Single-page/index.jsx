import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import { RelatedMovie } from "../related-movie/related-movie";
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
      <div className={style.single_movie}>
        <img src={images[0]} className={style.img_single} />
      </div>
      <div className={style.contents}>
        <h1>Title:{title}</h1>
        <h2>Director:{director}</h2>
        <h2>Country:{country}</h2>
        <h2>Writer:{writer}</h2>
      </div>
      <h1>Plot:</h1>
      <div>{plot}</div>
      <h3>فیلم های مشابه</h3>
      <RelatedMovie id={movie_id} />
    </Fragment>
  );
}
