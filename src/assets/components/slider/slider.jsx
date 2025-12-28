import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../utilites/api";
import style from "./slider.style.module.css";

export function Slider() {
  const [movieRandom, setMovieRandom] = useState([
    { poster: "", images: [], title: "" },
  ]);
  const [currentMovie, setCurrentMovie] = useState(0);

  async function get() {
    try {
      const reposive = await instance.get("random_movies");
      setMovieRandom(reposive.data);
      console.log(currentMovie);
    } catch (e) {
      console.log(e);
    }
  }
  function prev() {
    if (currentMovie === 0) return;
    else {
      setCurrentMovie(currentMovie - 1);
    }
  }
  function next() {
    if (currentMovie === movieRandom.length - 1) return;
    setCurrentMovie(currentMovie + 1);
  }
  useEffect(function () {
    get();
  }, []);
  return (
    <Fragment>
      <div className={style.slider_main}>
        <div className={style.slider}>
          <div
            className={style.bg}
            style={{
              backgroundImage: `url(${movieRandom[currentMovie].images[0]})`,
            }}
          ></div>
          <div className={style.overlay}></div>
          <div className="container">
            <div className={style.showInfo}>
              <div className={style.title}>
                <h1>{movieRandom[currentMovie].title}</h1>
                <Link to="#">
                  <div className={style.tittle_button}>
                    <span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.34301 2.34301C-0.781003 5.46702 -0.781003 10.533 2.34301 13.657C5.46702 16.781 10.533 16.781 13.657 13.657C16.781 10.533 16.781 5.46702 13.657 2.34301C10.533 -0.781003 5.46702 -0.781003 2.34301 2.34301ZM8.32084 3.3562C8.99631 3.3562 9.53668 3.91346 9.53668 4.58892C9.53668 5.26438 8.97942 5.82164 8.32084 5.82164C7.64538 5.82164 7.08813 5.26438 7.08813 4.57203C7.08813 3.89657 7.64538 3.3562 8.32084 3.3562ZM10.0602 11.6137C10.0264 11.715 9.95884 11.8332 9.89129 11.9008C9.45224 12.3567 8.91187 12.6269 8.27018 12.6269C7.96623 12.6269 7.67916 12.6269 7.3752 12.5763C6.88549 12.5087 6.26069 11.9008 6.34512 11.2591C6.41267 10.8201 6.48021 10.381 6.54776 9.94195C6.68285 9.18206 6.81794 8.40528 6.95303 7.64538C6.95303 7.59472 6.96992 7.54406 6.96992 7.4934C6.96992 7.17256 6.8686 7.05435 6.54776 7.02058C6.41267 7.00369 6.27757 6.98681 6.14248 6.95303C5.9905 6.90237 5.90607 6.76728 5.92296 6.64908C5.93984 6.51398 6.02427 6.42955 6.19314 6.39578C6.27757 6.37889 6.37889 6.37889 6.48021 6.37889C6.85172 6.37889 7.22322 6.37889 7.61161 6.37889C8.01689 6.37889 8.40528 6.37889 8.81055 6.37889C9.09763 6.37889 9.26649 6.51398 9.26649 6.80106C9.26649 7.03747 9.23272 7.27388 9.18206 7.51029C9.03008 8.38839 8.86121 9.2496 8.70924 10.1277C8.65858 10.4148 8.59103 10.7018 8.55726 10.9889C8.54037 11.124 8.55726 11.276 8.59103 11.4111C8.64169 11.5968 8.77678 11.6982 8.96253 11.6813C9.11451 11.6644 9.26649 11.6137 9.41847 11.5462C9.53668 11.4955 9.638 11.4111 9.7562 11.3773C9.95884 11.3098 10.1108 11.428 10.0602 11.6137Z"
                          fill="#fff"
                        ></path>
                      </svg>
                    </span>
                    <span>MoreInfo</span>
                  </div>
                </Link>
              </div>
              <div className={style.arrow}>
                <button className={style.arrow_button} onClick={prev}>
                  <svg
                    className={style.svg_l}
                    xmlns="http://www.w3.org/2000/svg"
                    height="15px"
                    viewBox="0 -960 960 960"
                    width="15px"
                    fill="#f3efefff"
                    strokeWidth="30"
                    stroke="#f3efefff"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                </button>
                <button className={style.arrow_button} onClick={next}>
                  <svg
                    className={style.svg_r}
                    xmlns="http://www.w3.org/2000/svg"
                    height="15px"
                    viewBox="0 -960 960 960"
                    width="15px"
                    fill="#f3efefff"
                    strokeWidth="30"
                    stroke="#f3efefff"
                  >
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
