"use client";

import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Genres } from "@/lib/definitions";

export const useGenres = (type: "movie" | "tv") => {
  const [genresTv, setGenresTv] = useLocalStorage<Genres[]>("genres-tv", []);
  const [genresMovie, setGenresMovie] = useLocalStorage<Genres[]>(
    "genres-movie",
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      (type === "movie" && genresMovie.length === 0) ||
      (type === "tv" && genresTv.length === 0)
    ) {
      setLoading(true);

      const fetchGenres = async () => {
        try {
          const res = await fetch(`/genre?type=${type}`);
          if (!res.ok) throw new Error(`Błąd: ${res.status} ${res.statusText}`);

          const data = await res.json();
          if (!data || data.length === 0) throw new Error("Brak danych");
          if (type === "movie") setGenresMovie(data.genres);
          else setGenresTv(data.genres);
        } catch (e) {
          console.error(e);
          return [];
        } finally {
          setLoading(false);
        }
      };
      fetchGenres();
    }
  }, [type, setGenresMovie, setGenresTv, genresMovie.length, genresTv.length]);

  const genres = type === "movie" ? genresMovie : genresTv;

  return { genres, loading };
};
