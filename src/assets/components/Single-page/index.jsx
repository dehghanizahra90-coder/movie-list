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
      <img src={singleMovie.poster} />
    </Fragment>
  );
}
