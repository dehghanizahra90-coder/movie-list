import instance from "../utilites/api";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function useSerach() {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState({
    data: [],
    metadata: {
      current_page: 1,
      per_page: 2,
      page_count: 25,
      total_count: 250,
    },
  });
  const [queryString, setQueryString] = useSearchParams();
  const q = queryString.get("q") ?? "";

  async function handleSearch(searchText) {
    console.log("search:", JSON.stringify(searchText));
    if (searchText.length >= 3) {
      setValue(searchText);
      console.log("search:2", JSON.stringify(searchText));
      try {
        const resp = await instance.get("movies", {
          params: { q: searchText },
        });
        console.log(searchText);
        setQueryString(createSearchParams({ q: searchText }));
        setMovies(resp.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setOptions([]);
    }
  }
  //   const filtered = movies.data
  //     .filter(function (movies) {
  //       return movies.title.includes(value);
  //     })
  //     .map(function (movies) {
  //       return {
  //         value: movies.title,
  //         label: movies.title,
  //       };
  //     });
  //   console.log("value", value);
  //   setOptions(filtered);
  // }
  useEffect(() => {
    const filtered = movies.data.map((movie) => ({
      value: movie.title,
      label: movie.title,
      id: movie.id,
    }));
    setOptions(filtered);
  }, [movies]);

  return { handleSearch, options };
}
