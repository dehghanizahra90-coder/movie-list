import instance from "../utilites/api";
import { useState } from "react";
export function useGetApi() {
  const [movies, setMovie] = useState([]);
  async function getApi(page) {
    try {
      const respon = await instance.get(`movies?page=${page}`);
      setMovie(respon.data.data);
      console.log(respon.data.data);
    } catch (e) {
      console.log(e);
    }
  }
  return { movies, getApi };
}
