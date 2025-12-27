import { useEffect, useRef, useState } from "react";
import { Col, Row, Tooltip } from "antd";
import style from "./list-movie.style.module.css";
import { convertMinutesStr } from "../../utilites/convertmintohour";
import { useHoverShowInfo } from "../../Hook/hover-hook";
import { useGetApi } from "../../Hook/get-api-hook";
import { Link } from "react-router-dom";

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
        <Row gutter={15} wrap={false}>
          {movies.map(function ({ id, poster, title }) {
            return (
              <Col flex="0 0 auto" key={id}>
                <Link to={`/movies/${id}`}>
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
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>

    // </Carousel>
  );
}
