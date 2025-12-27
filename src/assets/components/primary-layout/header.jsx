import { Link, useNavigate } from "react-router-dom";
import style from "./header.style.module.css";
import { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { useSerach } from "../../Hook/search";
// import { useNavigate } from "react-router-dom";

export function Header() {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { handleSearch, options } = useSerach();
  console.log("option:", options);
  const onSelect = (data) => {
    console.log("onSelect", data);
    const movie = options.find((o) => o.value === data);
    if (movie) {
      navigate(`movies/${movie.id}`);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={style.wrapper}>
      <div className="container">
        <div
          className={`${style.header}  ${hide ? style.hidden : ""} ${
            open ? style.openSearch : ""
          }`}
        >
          <div className={style.logo}>
            <Link to="/">
              <img src="/logo.svg" />
            </Link>
          </div>
          <div className={style.menu_list_sub}>
            <span>Film</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#f5f4f4"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
            <div className={style.sub_menu}>
              <ul>
                <li>
                  <Link to="/genres/Crime">Crime</Link>
                </li>
                <li>
                  <Link to="/genres/Drama">Drama</Link>
                </li>
                <li>
                  <Link to="/genres/Action">Action</Link>
                </li>
                <li>
                  <Link to="/genres/Biography">Biography</Link>
                </li>
                <li>
                  <Link to="/genres/History">History</Link>
                </li>
                <li>
                  <Link to="/genres/Adventure">Adventure</Link>
                </li>
                <li>
                  <Link to="/genres/Fantasy">Fantasy</Link>
                </li>
                <li>
                  <Link to="/genres/Western">Western</Link>
                </li>
                <li>
                  <Link to="/genres/Comedy">Comedy</Link>
                </li>
                <li>
                  <Link to="/genres/Family">Family</Link>
                </li>
                <li>
                  <Link to="/genres/Romance">Romance</Link>
                </li>
                <li>
                  <Link to="/genres/Mystery">Mystery</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={style.menu_list_sub}>
            <span>Serial</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#f5f4f4"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
            <div className={style.sub_menu}>
              <ul>
                <li>
                  <Link to="/genres/Crime">Crime</Link>
                </li>
                <li>
                  <Link to="/genres/Drama">Drama</Link>
                </li>
                <li>
                  <Link to="/genres/Action">Action</Link>
                </li>
                <li>
                  <Link to="/genres/Biography">Biography</Link>
                </li>
                <li>
                  <Link to="/genres/History">History</Link>
                </li>
                <li>
                  <Link to="/genres/Adventure">Adventure</Link>
                </li>
                <li>
                  <Link to="/genres/Fantasy">Fantasy</Link>
                </li>
                <li>
                  <Link to="/genres/Western">Western</Link>
                </li>
                <li>
                  <Link to="/genres/Comedy">Comedy</Link>
                </li>
                <li>
                  <Link to="/genres/Family">Family</Link>
                </li>
                <li>
                  <Link to="/genres/Romance">Romance</Link>
                </li>
                <li>
                  <Link to="/genres/Mystery">Mystery</Link>
                </li>
              </ul>
            </div>
          </div>
          <span className={style.menu_item}>
            <Link to="/genres">
              <span className={style.categori}>Category</span>
            </Link>
            <span>Kids</span>
            <span>National</span>
            <span>OnlineFilm</span>
          </span>
          <div className={style.showSearch}>
            <button
              className={style.searchButton}
              onClick={function () {
                setOpen(function (pr) {
                  return !pr;
                });
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1564 18.3125C16.6609 18.3125 20.3189 14.6608 20.3267 10.1562C20.3345 5.65167 16.6891 2 12.1846 2C7.68 2 4.02201 5.65167 4.01423 10.1562C4.00644 14.6608 7.65181 18.3125 12.1564 18.3125Z"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M7.25195 16.8828L1.99915 22.1447"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>
            {open && (
              <AutoComplete
                className={style.searchBox}
                options={options}
                onSelect={onSelect}
                // onSearch={handleSearch}
                onSearch={(text) => {
                  if (!text) return;
                  handleSearch(text);
                }}
                placeholder="Search"
                autoFocus
                style={{
                  display: open ? "block" : "none",
                  position: "absolute",
                  top: "-4px",
                  left: 0,
                  width: "100%",
                }}
              />
            )}
          </div>
          <button className={style.subscrib}>Subscribe</button>
          <button className={style.signin}>Signin</button>
        </div>
      </div>
    </div>
  );
}
