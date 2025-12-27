import { Link } from "react-router-dom";
import style from "./list-film.style.module.css";
import { convertMinutesStr } from "../../utilites/convertmintohour";

export function ListMovie({ data }) {
  return (
    <div className={style.vige}>
      <h2>Special</h2>
      <ul>
        {data.data.map(function ({
          id,
          images,
          title,
          runtime,
          year,
          country,
        }) {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                <img src={images[0]} />
                <div className={style.info}>
                  <h6 className="mg pdb5">{title}</h6>
                  <h6 className="mg pdb5">{year}</h6>
                  <h6 className="mg pdb5">{country}</h6>
                  <h6 className="mg pdb5">{convertMinutesStr(runtime)}</h6>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
