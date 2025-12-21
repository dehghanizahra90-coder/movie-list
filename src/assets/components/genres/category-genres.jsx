import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import style from "./genres.style.module.css";
import { Link } from "react-router-dom";

export function ShowGenres() {
  const [genres, setGener] = useState([]);

  async function getGenres() {
    const respons = await instance.get("genres");
    try {
      setGener(respons.data);
      console.log(respons.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getGenres();
  }, []);
  return (
    <div className={style.ccc}>
      <ul>
        <li>
          <Link to={`/genres/Action`}>
            <img src="/image/action.jpg" />
          </Link>
        </li>

        <li>
          <Link to={`/genres/Adventure`}>
            <img src="/image/adventure.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Biography`}>
            <img src="/image/biographi.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Comedy`}>
            <img src="/image/comedy.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Crime`}>
            <img src="/image/crim.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Drama`}>
            <img src="/image/dddd.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Horror`}>
            <img src="/image/horror.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Music`}>
            <img src="/image/music.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Mystery`}>
            <img src="/image/mystry.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Romance`}>
            <img src="/image/romantic.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Thriller`}>
            <img src="/image/triller.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Western`}>
            <img src="/image/western.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Sport`}>
            <img src="/image/sport.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Sci-Fi`}>
            <img src="/image/sci-fi.jpg" />
          </Link>
        </li>
        <li>
          <Link to={`/genres/Family`}>
            <img src="/image/family.jpg" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
