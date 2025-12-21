import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "./components/primary-layout/primary-layout";
import { HomePage } from "./pages/home-page";
import FormSend from "./pages/submit-movie-page";
import { SingleMovie } from "./components/Single-page";
import { ShowGenres } from "./components/genres/category-genres";
import { Movie } from "./components/movie-list/movie";
import { MovieListCard } from "./components/list-movie-componenet/list-movie";
// import { TopMovieCard } from "./components/list-movie-componenet/list-movie-top";
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormSend />} />
          <Route path="/form2" element={<Movie />} />
          {/* <Route path="/form3" element={<TopMovieCard />} /> */}
          <Route path="/movieList" element={<MovieListCard />} />
          <Route path="/genres" element={<ShowGenres />} />
          <Route path="movies/:movie_id" element={<SingleMovie />} />
          {/* <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
