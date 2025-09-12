import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface SearchResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/search/movie`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    });

    return response.data.results ?? [];
  } catch (error: unknown) {
    // вместо any → unknown
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized: check your VITE_TMDB_TOKEN");
      }
    }
    throw error;
  }
};
