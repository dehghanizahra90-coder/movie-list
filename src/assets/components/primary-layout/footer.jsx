import { useState, useEffect } from "react";
import style from "./footer.style.module.css";
export function Footer() {
  const [show, setShow] = useState(false);
  function onClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`${style.footer} ${show ? style.show : ""}`}>
      <div className={style.footer_r}>
        <h6>Questions</h6>
        <h6>Contact us</h6>
        <h6>Rules and Regulations</h6>
        <h6>Social networks</h6>
        <h6>Question</h6>
      </div>
      <div className={style.footer_l}>
        <h6>Get the application</h6>
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#dbd9d9ff"
        >
          <path d="m319-280 161-73 161 73 15-15-176-425-176 425 15 15ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </div>
    </div>
  );
}
