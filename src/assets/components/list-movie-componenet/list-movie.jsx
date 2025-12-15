import { useEffect, useState } from "react";
import instance from "../../utilites/api";
import { Col, Row, Tooltip, Typography } from "antd";
import style from "./list-movie.style.module.css";
import { convertMinutesStr } from "../../utilites/convertmintohour";

const { Text } = Typography;

export function MovieList() {
  const [movie, setMovie] = useState([]);
  const [filmInfo, setFilmInfo] = useState();
  const [activeId, setActiveId] = useState();

  async function getApi(page = 1) {
    const responsiv = await instance.get("movies?page={page}");
    try {
      setMovie(responsiv.data.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function hoverShowInfo(movie_id) {
    try {
      const respon = await instance.get(`movies/${movie_id}`);
      setFilmInfo(respon.data);
      setActiveId(movie_id);
      console.log(respon.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(function () {
    getApi();
  }, []);
  return (
    // <Carousel>
    <Row gutter={15} wrap={false}>
      {movie.map(function ({ id, poster, title }) {
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

    // </Carousel>
  );
}
