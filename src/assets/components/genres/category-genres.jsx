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
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Action`}>
              <img src="/image/action.jpg" />
            </Link>
          </div>
          <h5>Action</h5>
        </li>

        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Adventure`}>
              <img src="/image/adventure.jpg" />
            </Link>
          </div>
          <h5>Adventure</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Biography`}>
              <img src="/image/biographi.jpg" />
            </Link>
          </div>
          <h5>Biography</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Comedy`}>
              <img src="/image/comedy.jpg" />
            </Link>
          </div>
          <h5>Comedy</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Crime`}>
              <img src="/image/crim.jpg" />
            </Link>
          </div>
          <h5>Crime</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Drama`}>
              <img src="/image/dddd.jpg" />
            </Link>
          </div>
          <h5>Drama</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Horror`}>
              <img src="/image/horror.jpg" />
            </Link>
          </div>
          <h5>Horror</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Music`}>
              <img src="/image/music.jpg" />
            </Link>
          </div>
          <h5>Music</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Mystery`}>
              <img src="/image/mystry.jpg" />
            </Link>
          </div>
          <h5>Mystery</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Romance`}>
              <img src="/image/romantic.jpg" />
            </Link>
          </div>
          <h5>Romance</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Thriller`}>
              <img src="/image/triller.jpg" />
            </Link>
          </div>
          <h5>Thriller</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Western`}>
              <img src="/image/western.jpg" />
            </Link>
          </div>
          <h5>Western</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Sport`}>
              <img src="/image/sport.jpg" />
            </Link>
          </div>
          <h5>Sport</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Sci-Fi`}>
              <img src="/image/sci-fi.jpg" />
            </Link>
          </div>
          <h5>Sci-Fi</h5>
        </li>
        <li>
          <div style={{ overflow: "hidden", borderRadius: "5px" }}>
            <Link to={`/genres/Family`}>
              <img src="/image/family.jpg" />
            </Link>
          </div>
          <h5>Family</h5>
        </li>
      </ul>
    </div>
  );
}
