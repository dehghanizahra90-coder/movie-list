import { Fragment } from "react";
import { Movie } from "../components/movie-list/movie";
import { Slider } from "../components/slider/slider";
import style from "./home-page.style.module.css";
import { MovieListCard } from "../components/list-movie-componenet/list-movie";
import "../../assets/global.css";
import { SingleMovieCard } from "../components/list-movie-componenet/single-movie";
import { Link } from "react-router-dom";
// import { TopMovieCard } from "../components/list-movie-componenet/list-movie-top";

export function HomePage() {
  return (
    <Fragment>
      <Slider />
      <div className="container">
        <div className={style.bottom}>
          <Movie />
        </div>
        <div className="flex">
          <h2>تازه های فیلم نت</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#eae4e4ff"
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </div>
        <MovieListCard page={1} />
      </div>
      <div className="mg56">
        <Link to="/movies/50}">
          <SingleMovieCard id={50} />
        </Link>
      </div>
      <div className="container">
        <div className="flex">
          <h2>سینما آنلاین</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#eae4e4ff"
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </div>
        <MovieListCard page={2} />
      </div>
      {/* <TopMovieCard /> */}
    </Fragment>
  );
}
