import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import { RelatedMovie } from "../related-movie/related-movie";
import { useParams } from "react-router-dom";
import style from "./single-page.style.module.css";
import { convertMinutesStr } from "../../utilites/convertmintohour";

export function SingleMovie() {
  const { movie_id } = useParams();
  const [singleMovie, setSingleMovie] = useState({
    title: "",
    actors: "",
    box_office: "",
    country: "",
    dvd: "",
    director: "",
    imdb_id: "",
    poster: "",
    imdb_votes: "",
    user_cover: "",
    language: "",
    plot: "",
    writer: "",
    year: "",
    runtime: "",
    released: "",
    ratings: "[]",
    rated: "",
    awards: "",
    imdb_rating: "",
    images: [],
    genres: [],
  });
  async function getApi() {
    try {
      const respon = await instance.get(`movies/${movie_id}`);
      setSingleMovie(respon.data);
      console.log(respon.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(
    function () {
      getApi();
    },
    [movie_id]
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [movie_id]);

  // const {
  //   title,
  //   actors,
  //   box_office,
  //   country,
  //   dvd,
  //   director,
  //   imdb_id,
  //   poster,
  //   imdb_votes,
  //   user_cover,
  //   language,
  //   plot,
  //   writer,
  //   year,
  //   runtime,
  //   released,
  //   ratings = [],
  //   rated,
  //   awards,
  //   imdb_rating,
  //   images = [],
  // } = singleMovie;
  const ratingsArray = singleMovie.ratings
    ? JSON.parse(singleMovie.ratings)
    : [];

  return (
    <Fragment>
      <div>
        <div
          className={style.single_movie}
          style={{ backgroundImage: `url(${singleMovie.images[0]})` }}
        >
          {/* <img src={singleMovie.images[0]} className={style.img_single} /> */}
        </div>
        <div className={style.contents}>
          <h2 className="mg">{singleMovie.title}</h2>
          <div className={style.imdb}>
            <div className="flex gap5 alignitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#fafafaff"
              >
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
              </svg>
              <h6>{ratingsArray[1]?.Value || ""}</h6>
            </div>
            <div className="flex gap5 alignitem">
              <h6 className="mg">IMDB</h6>
              <h6 className="mg">{singleMovie.imdb_rating}</h6>
            </div>
          </div>

          <div className="flex gap10 mg ">
            <p className="mg fontsize5 width25">Director:</p>
            <h6 className="mg">{singleMovie.director}</h6>
          </div>
          <div className="flex gap10 mg">
            <p className="mg fontsize5 width25"> Writer:</p>
            <h6 className="mg">{singleMovie.writer}</h6>
          </div>
          <div className="flex gap5 alignitem pdt10 pdb16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#fbf9f9ff"
            >
              <path d="M582-298 440-440v-200h80v167l118 118-56 57ZM440-720v-80h80v80h-80Zm280 280v-80h80v80h-80ZM440-160v-80h80v80h-80ZM160-440v-80h80v80h-80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <h6 className="mg">{convertMinutesStr(singleMovie?.runtime)}</h6>
            <h6 className="mg">{singleMovie.year}</h6>
            <h6 className="mg">{singleMovie.country}</h6>
          </div>
          {
            <ul className="flex gap10 listGenres">
              {singleMovie.genres.map(function (item) {
                return (
                  <li
                    style={{
                      backgroundColor: "hsla(0, 1%, 19%, 1.00)",
                      padding: "4px 12px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6 className="mg">{item}</h6>
                  </li>
                );
              })}
            </ul>
          }
        </div>
      </div>

      <div
        style={{
          padding: "24px 128px 96px 184px",
          position: "relative",
          zIndex: "5",
          width: "40%",
        }}
      >
        <h1>Plot:</h1>
        <div>{singleMovie.plot}</div>
      </div>
      <div style={{ padding: "24px 128px 96px 184px" }}>
        <h3>RelatedMovies</h3>
        <RelatedMovie id={movie_id} />
      </div>
    </Fragment>
  );
}
