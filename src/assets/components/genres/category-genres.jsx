import { Fragment, useEffect, useState } from "react";
import instance from "../../utilites/api";
import style from "./genres.style.module.css";

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
          <img src="/image/action.jpg" />
        </li>
        <li>
          <img src="/image/adventure.jpg" />
        </li>
        <li>
          <img src="/image/biographi.jpg" />
        </li>
        <li>
          <img src="/image/comedy.jpg" />
        </li>
        <li>
          <img src="/image/crim.jpg" />
        </li>
        <li>
          <img src="/image/dddd.jpg" />
        </li>
        <li>
          <img src="/image/horror.jpg" />
        </li>
        <li>
          <img src="/image/music.jpg" />
        </li>
        <li>
          <img src="/image/mystry.jpg" />
        </li>
        <li>
          <img src="/image/romantic.jpg" />
        </li>
        <li>
          <img src="/image/triller.jpg" />
        </li>
        <li>
          <img src="/image/western.jpg" />
        </li>
        <li>
          <img src="/image/sport.jpg" />
        </li>
        <li>
          <img src="/image/sci-fi.jpg" />
        </li>
        <li>
          <img src="/image/family.jpg" />
        </li>
      </ul>
    </div>
  );
}
