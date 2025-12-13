import style from "./movie.style.module.css";

export function ListMovie({ data }) {
  return (
    <div className={style.vige}>
      <p>ویژه</p>
      <ul>
        {data.data.map(function ({ id, images, title }) {
          return (
            <li key={id}>
              <img src={images[0]} />
              <div className={style.info}>
                <h6>{title}</h6>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
