import style from "./header.style.module.css";

export function Header() {
  return (
    // <div className={style.container}>
    <div className={style.header}>
      <div className={style.right}>
        <div className={style.logo}>
          <img src="/logo.svg" />
        </div>
        <div className={style.menu}>
          <span className={style.menu_list}>
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
            </div>

            <span>Category</span>
            <span>Kids</span>
            <span>National</span>
            <span>OnlineFilm</span>
          </span>
        </div>
      </div>

      <div className={style.register}>
        <span>
          <svg
            width="24"
            height="24"
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
        </span>
        <button className={style.sell}>Subscribe</button>
        <button className={style.inter}>Signin</button>
      </div>
    </div>
  );
}
