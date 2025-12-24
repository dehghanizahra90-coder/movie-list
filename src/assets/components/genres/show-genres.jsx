import { useState, useEffect, useRef } from "react";
import instance from "../../utilites/api";
import { ListMovie } from "../movie-list/list-film";
import { useParams } from "react-router-dom";
import style from "./show-genres.style.module.css";
import { useHoverShowInfo } from "../../Hook/hover-hook";
import { MovieHoverInfo } from "../list-movie-componenet/movie-hover-info";

import { lazy } from "react";

export function ShowGenress() {
  const { name } = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { filmInfo, activeId, hoverShowInfo, setActiveId } = useHoverShowInfo();
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
      setGener(function (prev) {
        return {
          data: [...prev.data, ...respons.data.data],
          metadata: respons.data.metadata,
        };
      });
      console.log(page, "page");
      console.log(respons.data);
      console.log(respons.data.metadata);
      setPage(page);
      setLoading(false);
      if (
        respons.data.metadata.current_page >= respons.data.metadata.page_count
      ) {
        console.log("changemore");
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getGenres(page);
    console.log("ef1");
  }, []);

  useEffect(() => {
    if (ul.current.scrollHeight < window.innerHeight) {
      console.log("us1");
      getGenres(page + 1);
    } else return;
  }, [page]);
  // const ull=document.querySelector(".ul")
  // ul.scrollY
  useEffect(() => {
    function handleScroll() {
      if (!ul.current || loading || !hasMore) return;
      console.log("ul.current.scrollHeight", ul.current.scrollHeight);
      console.log("ul.current.scrollY", ul.current.scrollHeight);
      console.log("window.scrollY", window.scrollY);
      console.log("window.innerHeight", window.innerHeight);
      console.log(
        "all",
        window.innerHeight,
        document.documentElement.clientHeight,
        document.body.clientHeight
      );
      const bottomReached =
        window.innerHeight + window.scrollY + 50 >=
          document.body.clientHeight && hasMore;

      if (bottomReached) {
        console.log(page);
        getGenres(page + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <div className="container">
      <ul className={style.card} ref={ul}>
        {genres.data.map(function ({ id, poster, title }) {
          return (
            <li key={id} className={style.list}>
              {/* <div
                className={style.movieList}
                onMouseLeave={() => setActiveId(null)}
                onMouseEnter={() => hoverShowInfo(id)}
              >
                <img src={poster} loading="lazy" />
                {activeId === id && <MovieHoverInfo filmInfo={filmInfo} />}
              </div> */}
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
