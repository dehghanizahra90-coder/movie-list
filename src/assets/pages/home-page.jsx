import { Fragment } from "react";
import { Movie } from "../components/movie-list/movie";
import { Slider } from "../components/slider/slider";
import style from "./home-page.style.module.css";
import { MovieListCard } from "../components/list-movie-componenet/list-movie";
import "../../assets/global.css";
import { SingleMovieCard } from "../components/list-movie-componenet/single-movie";
import { Link } from "react-router-dom";
import { TopMovieCard } from "../components/list-movie-componenet/list-movie-top";

export default function HomePage() {
  return (
    <Fragment>
      <Slider />
      <div className="container">
        <div className={style.bottom}>
          <Movie />
        </div>
        <div className="flex mg56 cursor redHover">
          <h2 className="mg">Film News</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#fbf8f8ff"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </div>
        <MovieListCard page="1" />
      </div>
      <div className="mg56">
        <Link to="/movies/50}">
          <SingleMovieCard id={50} />
        </Link>
      </div>
      <div className="container">
        <div className="flex mg56 cursor redHover">
          <h2 className="mg">Online cinema</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#fbf8f8ff"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </div>
        <MovieListCard page={2} />
      </div>
      <div className="container">
        <div className="mg56">
          <h2 className="mg">Special offer</h2>
          <TopMovieCard page={10} />
        </div>
      </div>
      <div className="container">
        <div className="flex mg56 cursor redHover">
          <h2 className="mg">Favorite</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#fbf8f8ff"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </div>
        <MovieListCard page="3" />
      </div>
    </Fragment>
  );
}
