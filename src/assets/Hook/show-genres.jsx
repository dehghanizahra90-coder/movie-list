import { useState, useEffect } from "react";
import instance from "../utilites/api";
import { ListMovie } from "../components/movie-list/list-film";
import { useParams } from "react-router-dom";
export function ShowGenress() {
  const { name } = useParams();
  const [genres, setGener] = useState({ data: [] });
  async function getGenres() {
    try {
      const respons = await instance.get(`genres/${name}/movies?page={page}`);
      setGener(respons.data);
      console.log(respons.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getGenres();
  }, []);
  return <ListMovie data={genres} />;
}
