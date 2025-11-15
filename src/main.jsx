import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./assets/router";

createRoot(document.getElementById("root")).render(
  <Fragment>
    <Router />
  </Fragment>
);
