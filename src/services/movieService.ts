import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!API_TOKEN) {
  console.warn("⚠️ Missing VITE_TMDB_TOKEN. Add it to your .env or Vercel env vars.");
}

interface SearchResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query: query.trim(),
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    });

    return response.data.results ?? [];
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: check your VITE_TMDB_TOKEN on Vercel.");
    }
    throw error;
  }
};
