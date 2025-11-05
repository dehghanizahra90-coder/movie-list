import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "./components/primary-layout/primary-layout";
import { HomePage } from "./pages/home-page";
import FormSend from "./pages/submit-movie-page";
import { SingleMovie } from "./components/Single-page";
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormSend />} />
          <Route path="movies/:movie_id" element={<SingleMovie />} />
          {/* <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
