import { useEffect, useRef, useState } from "react";
import { Col, Row, Tooltip, Typography } from "antd";
import style from "./list-movie.style.module.css";
import { convertMinutesStr } from "../../utilites/convertmintohour";
import { useHoverShowInfo } from "../../Hook/hover-hook";
import { useGetApi } from "../../Hook/get-api-hook";

export function MovieListCard({ page }) {
  const viewRef = useRef(null);
  const cardRef = useRef(null);

  const [index, setIndex] = useState();
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, SetVisibleCount] = useState(0);
  const { filmInfo, activeId, hoverShowInfo, setActiveId } = useHoverShowInfo();
  const { movies, getApi } = useGetApi();

  useEffect(
    function () {
      if (!viewRef.current || !cardRef.current) return;
      const cardW = cardRef.current.offsetWidth + 15;
      const vieww = viewRef.current.offsetWidth;

      setCardWidth(cardW);
      SetVisibleCount(Math.floor(vieww / cardW));
    },
    [movies]
  );
  const maxIndex = Math.max(0, movies.length - visibleCount);

  function next() {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }

  function prev() {
    setIndex((prev) => Math.max(prev - 1, 0));
  }

  useEffect(function () {
    getApi(page);
  }, []);

  return (
    // <Carousel>
    <div style={{ overflow: "hidden" }}>
      <div style={{ overflowY: "hidden" }}>
        {/* <div className={style.arrow}>
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
        </div> */}
        <Row gutter={15} wrap={false}>
          {movies.map(function ({ id, poster, title }) {
            return (
              <Col flex="0 0 auto" key={id}>
                <div className={style.card}>
                  <div
                    className={style.movieList}
                    onMouseLeave={() => setActiveId(null)}
                    onMouseEnter={() => hoverShowInfo(id)}
                  >
                    <img src={poster} />
                    {activeId === id && (
                      <div className={style.info}>
                        <h5>{filmInfo?.title}</h5>
                        <h5>
                          {filmInfo?.year}/{filmInfo?.country}
                        </h5>
                        <h5>{convertMinutesStr(filmInfo?.runtime)}</h5>
                        <h5>
                          {filmInfo?.imdb_rating}
                          <span style={{ paddingLeft: "5px" }}>IMDB</span>
                        </h5>
                      </div>
                    )}
                  </div>
                  <Tooltip title={title}>
                    <div
                      style={{
                        maxWidth: "180px",
                        color: "white",
                        direction: "ltr",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {title}
                    </div>
                  </Tooltip>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>

    // </Carousel>
  );
}
