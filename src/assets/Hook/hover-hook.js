import { useState } from "react";
import instance from "../utilites/api";
export function useHoverShowInfo() {
  const [filmInfo, setFilmInfo] = useState();
  const [activeId, setActiveId] = useState();
  async function hoverShowInfo(movie_id) {
    try {
      const respon = await instance.get(`movies/${movie_id}`);
      setFilmInfo(respon.data);
      setActiveId(movie_id);
      console.log(respon.data);
    } catch (e) {
      console.log(e);
    }
  }
  return {
    filmInfo,
    activeId,
    hoverShowInfo,
    setActiveId,
  };
}
