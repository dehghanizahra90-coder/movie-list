import { ListMovie } from "./list-film";
import { useEffect, useState } from "react";
import instance from "../../utilites/api";

export function Movie() {
  const [movies, setMovies] = useState({
    data: [],
    metadata: {
      current_page: 1,
      per_page: 2,
      page_count: 25,
      total_count: 250,
    },
  });
  async function getApi(page = 1) {
    try {
      const responsive = await instance.get("movies", { params: { page } });
      setMovies(responsive.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(function () {
    getApi();
  }, []);
  return <ListMovie data={movies} />;
}
