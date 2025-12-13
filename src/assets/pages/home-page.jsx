import { Fragment } from "react";
import { Movie } from "../components/movie-list/movie";
import { Slider } from "../components/slider/slider";
import style from "./home-page.style.module.css";

export function HomePage() {
  return (
    <Fragment>
      <Slider />
      <div className={style.bottom}>
        <Movie />
      </div>
    </Fragment>
  );
}
