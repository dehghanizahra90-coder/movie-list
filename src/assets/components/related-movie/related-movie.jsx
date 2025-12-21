import { useEffect, useState } from "react";
import instance from "../../utilites/api";
import { Row, Col, Tooltip } from "antd";
import style from "../list-movie-componenet/list-movie.style.module.css";
import { useHoverShowInfo } from "../../Hook/hover-hook";
import { convertMinutesStr } from "../../utilites/convertmintohour";
export function RelatedMovie({ id }) {
  const [movies, setMovie] = useState([]);
  const { filmInfo, activeId, hoverShowInfo, setActiveId } = useHoverShowInfo();
  async function getApiRelated(id) {
    try {
      const respon = await instance.get(`movies/related/${id}`);
      setMovie(respon.data);
      console.log(respon.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getApiRelated(id);
  }, []);
  return (
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
  );
}
