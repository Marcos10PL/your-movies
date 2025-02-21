"use client";

import { useEffect, useState } from "react";

import { Genre } from "@/lib/definitions";
import useLocalStorage from "./useLocalStorage";
import { LS_KEYS } from "@/lib/variables";

export function useGenres() {
  const [genresMovie, setGenresMovie] = useLocalStorage<Genre[]>(
    LS_KEYS.genresMovie,
    []
  );
  const [genresTv, setGenresTv] = useLocalStorage<Genre[]>(
    LS_KEYS.genresTv,
    []
  );
  const [loading, setLoading] = useState(genresTv.length > 0 ? false : true);

  useEffect(() => {
    const fetchGenres = async (type: "movie" | "tv") => {
      try {
        const res = await fetch(`/api/genres?type=${type}`);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        if (!data) throw new Error("No data");

        if (type === "tv") setGenresTv(data.genres);
        else setGenresMovie(data.genres);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (genresMovie.length === 0 || genresTv.length === 0) {
      fetchGenres("tv");
      fetchGenres("movie");
    }
  }, [genresMovie.length, genresTv.length, setGenresMovie, setGenresTv]);

  return { genresTv, genresMovie, loading };
}
