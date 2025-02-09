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

  const fetchGenres = async () => {
    try {
      const res = await fetch(`/genre?type=${type}`);
      if (!res.ok) throw new Error(`Błąd: ${res.status} ${res.statusText}`);

      const data = await res.json();
      if (!data || data.length === 0) throw new Error("Brak danych");
      return data.genres;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    if (
      (type === "movie" && genresMovie.length === 0) ||
      (type === "tv" && genresTv.length === 0)
    ) {
      setLoading(true);
      const loadGenres = async () => {
        const genres = await fetchGenres();

        if (type === "movie") setGenresMovie(genres);
        else setGenresTv(genres);

        setLoading(false);
      };

      loadGenres();
    }
  }, [type, genresMovie, genresTv, fetchGenres, setGenresMovie, setGenresTv]);

  const genres = type === "movie" ? genresMovie : genresTv;

  return { genres, loading };
};
