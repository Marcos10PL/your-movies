"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function SideNav() {
  const pathname = usePathname();

  if (pathname !== "/movies" && pathname !== "/series") return null;

  const params = useSearchParams();
  const [genres, setGenres] = useState([]);

  const nameOfGenre = params.get("name");

  const isMovie = pathname.startsWith("/movie");
  const endpoint = isMovie
    ? "https://api.themoviedb.org/3/genre/movie/list?language=en"
    : "https://api.themoviedb.org/3/genre/tv/list?language=en";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${endpoint}&api_key=${API_KEY}`);
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Błąd pobierania gatunków:", error);
      }
    };

    fetchGenres();
  }, [pathname]);

  return (
    <div className="flex flex-col gap-2 items-start">
      {genres.map(({ id, name }) => (
        <Link
          key={id}
          href={`${isMovie ? "/movies" : "/series"}/genres?id=${id}&name=${encodeURIComponent(name)}&page=1`}
          className={clsx(
            "flex items-center gap-2 py-1 px-2 hover:bg-gray-800 rounded-lg border-2 transition-colors",
            name === nameOfGenre
              ? "bg-gray-800 border-slate-700 pointer-events-none"
              : "border-transparent"
          )}
        >
          <p>{name}</p>
        </Link>
      ))}
    </div>
  );
}
