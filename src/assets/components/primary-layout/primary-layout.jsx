import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";
import { Header } from "./header";
import { Footer } from "./footer";

export function PrimaryLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
