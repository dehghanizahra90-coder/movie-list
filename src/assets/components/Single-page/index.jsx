import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import { ListMovie } from "../movie-list/list-film";
import { useParams } from "react-router-dom";

export function SingleMovie() {
  const { movie_id } = useParams();
  const [singleMovie, setSingleMovie] = useState({ title: "" });
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

  return (
    <Fragment>
      <h1>{singleMovie.title}</h1>
      <h3>{singleMovie.actors}</h3>
      <h3>{singleMovie.awards}</h3>
      <h3>{singleMovie.box_office}</h3>
      <h3>{singleMovie.country}</h3>
      <h3>{singleMovie.director}</h3>
      <h3>{singleMovie.dvd}</h3>
      <h3>{singleMovie.imdb_id}</h3>
      <h3>{singleMovie.imdb_votes}</h3>
      <h3>{singleMovie.language}</h3>
      <h3>{singleMovie.plot}</h3>
      <h3>{singleMovie.rated}</h3>
      <h3>{singleMovie.ratings}</h3>
      <h3>{singleMovie.released}</h3>
      <h3>{singleMovie.runtime}</h3>
      <h3>{singleMovie.writer}</h3>
      <h3>{singleMovie.year}</h3>
      <img src={singleMovie.user_cover} />
      <img src={singleMovie.poster} />
    </Fragment>
  );
}
