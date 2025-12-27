import { useEffect, useState } from "react";
import instance from "../../utilites/api";

export function SingleMovieCard({ id }) {
  const [movie, setMovie] = useState();
  async function getMovie(id) {
    try {
      const respon = await instance.get(`movies/${id}`);
      setMovie(respon.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getMovie(id);
  }, []);
  return (
    <img
      src={movie?.images[0]}
      style={{ width: "100%", aspectRatio: " 10/2", objectFit: "cover" }}
    />
  );
}
