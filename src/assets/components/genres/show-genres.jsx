import { useState, useEffect, useRef } from "react";
import instance from "../../utilites/api";
import { ListMovie } from "../movie-list/list-film";
import { useParams } from "react-router-dom";
import style from "./show-genres.style.module.css";
import { lazy } from "react";

export function ShowGenress() {
  const { name } = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ul = useRef(null);
  const [genres, setGener] = useState({
    data: [],
    metadata: {
      current_page: 1,
      page_count: "",
      per_page: 6,
      total_count: "",
    },
  });
  async function getGenres(page) {
    console.log(loading, "loading");
    console.log(hasMore, "more");
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const respons = await instance.get(`genres/${name}/movies?page=${page}`);
      setLoading(false);
      setGener(function (prev) {
        return {
          data: [...prev.data, ...respons.data.data],
          metadata: respons.data.metadata,
        };
      });
      console.log(page, "page");
      setPage(page);

      if (
        respons.data.metadata.current_page >= respons.data.metadata.page_count
      ) {
        console.log("changemore");
        setHasMore(false);
      }

      console.log(respons.data);
      console.log(respons.data.metadata);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getGenres(page);
    console.log("ef1");
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    getGenres(page + 1);
  }, [page]);

  //   useEffect(() => {
  //   function handleScroll() {
  //     if (!ul.current || loading || !hasMore) return;

  //     const bottomReached =
  //       ul.current.scrollHeight <=
  //       window.innerHeight + window.scrollY + 50;

  //     if (bottomReached) {
  //       getGenres(page + 1);
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [page, loading, hasMore]);

  return (
    <div className="container">
      <ul className={style.card} ref={ul}>
        {genres.data.map(function ({ id, poster, title }) {
          return (
            <li key={id} className={style.list}>
              <div className={style.show}>
                <img src={poster} loading="lazy" />
                <div>
                  <h6 className="mg">{title}</h6>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
