import axios from "axios";
import type { Movie } from "../types";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const { data } = await api.get<{ results: Movie[] }>("/trending/movie/day");
  return data.results;
}