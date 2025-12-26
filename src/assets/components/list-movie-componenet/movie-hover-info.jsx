import { convertMinutesStr } from "../../utilites/convertmintohour";
import style from "./list-movie-top.style.module.css";
export function MovieHoverInfo(filmInfo) {
  console.log(filmInfo.filmInfo.runtime);
  if (!filmInfo) return null;
  const movieInfo = filmInfo.filmInfo;
  return (
    <div className={style.info}>
      <h5>{movieInfo?.title}</h5>
      <h5>
        {movieInfo?.year}/{movieInfo?.country}
      </h5>
      <h5>{convertMinutesStr(movieInfo?.runtime)}</h5>
      <h5>
        {movieInfo?.imdb_rating}
        <span style={{ paddingLeft: "5px" }}>IMDB</span>
      </h5>
    </div>
  );
}
