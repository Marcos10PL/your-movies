"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Genres } from "@/lib/definitions";
import Spinner from "../../spinner";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function SideNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [genres, setGenres] = useState<Genres[]>([]);
  const [loading, setLoading] = useState(true);

  const nameOfGenre = params.get("name");
  const isMovie = pathname.startsWith("/movie");
  const endpoint = isMovie
    ? "https://api.themoviedb.org/3/genre/movie/list?language=en"
    : "https://api.themoviedb.org/3/genre/tv/list?language=en";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${endpoint}&api_key=${API_KEY}`);

        if (!res.ok)
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );

        const data = await res.json();
        if (!data || data.length === 0) throw new Error("No available data");
        else setGenres(data.genres);
        setLoading(false);
      } catch (e) {
        console.error(e);
        return [];
      }
    };

    fetchGenres();
  }, [pathname, endpoint]);

  if (pathname === "/") {
    return (
      <div className="h-full text-gray-400 py-1 space-y-6">
        <p>Discover the best movies and TV shows all in one place!</p>
        <p>
          This is a platform that allows you to quickly search and browse the
          latest movies and TV series. Whether you&#39;re looking for box office
          hits or hidden gems, you&#39;ll find them all. Stay up-to-date with the
          latest releases.
        </p>
      </div>
    );
  }

  if (!pathname.startsWith("/movies") && !pathname.startsWith("/series"))
    return null;

  return !loading ? (
    <div className="flex flex-col gap-1 items-start">
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
  ) : (
    <div className="flex items-center justify-center h-full">
      <Spinner />
    </div>
  );
}
