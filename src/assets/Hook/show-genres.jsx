import { useState, useEffect } from "react";
import instance from "../utilites/api";
import { ListMovie } from "../components/movie-list/list-film";
export function ShowGenress() {
  const [genres, setGener] = useState({ data: [] });
  async function getGenres(genre_name) {
    const respons = await instance.get(
      `genres/${genre_name}/movies?page={page}`
    );
    try {
      setGener(respons.data);
      console.log(respons.data);
      S;
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getGenres("Crime");
  }, []);
  return <ListMovie data={genres} />;
}
