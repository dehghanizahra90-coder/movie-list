import { Fragment } from "react";
import { Movie } from "../components/movie-list/movie";
import { Slider } from "../components/slider/slider";
import style from "./home-page.style.module.css";
import { MovieList } from "../components/list-movie-componenet/list-movie";
import "../../assets/global.css";

export function HomePage() {
  return (
    <Fragment>
      <Slider />
      <div className="container">
        <div className={style.bottom}>
          <Movie />
        </div>

        <p>تازه های فیلم نت</p>
        <MovieList />
      </div>
    </Fragment>
  );
}
