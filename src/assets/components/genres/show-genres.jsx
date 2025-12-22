import { useState, useEffect } from "react";
import instance from "../../utilites/api";
import { ListMovie } from "../movie-list/list-film";
import { useParams } from "react-router-dom";
import style from "./show-genres.style.module.css";
import { Pagination } from "antd";

export function ShowGenress() {
  const { name } = useParams();
  const [page, setPage] = useState(1);
  const [genres, setGener] = useState({
    data: [],
    metadata: {
      current_page: 1,
      page_count: "",
      per_page: 6,
      total_count: "",
    },
  });
  async function getGenres(page = 1) {
    try {
      const respons = await instance.get(`genres/${name}/movies?page=${page}`);
      setGener(respons.data);
      setPage(page);
      console.log(respons.data);
      console.log(respons.data.metadata);
    } catch (e) {
      console.log(e);
    }
  }
  function onChange(newPage) {
    getGenres(newPage);
  }
  useEffect(function () {
    getGenres();
  }, []);
  return (
    <div className="container">
      <ul className={style.card}>
        {genres.data.map(function ({ id, poster, title }) {
          return (
            <li key={id} className={style.list}>
              <div className={style.show}>
                <img src={poster} />
                <div>
                  <h6>{title}</h6>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Pagination
          defaultCurrent={page}
          total={genres.metadata.total_count}
          pageSize={genres.metadata.per_page}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
