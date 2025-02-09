"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import Spinner from "../../spinner";
import { useGenres } from "@/components/my-hooks/useGenres";

export default function SideNav() {
  const pathname = usePathname();
  const { genres, loading } = useGenres(pathname.startsWith("/movie") ? "movie" : "tv");

  const params = useSearchParams();
  const nameOfGenre = params.get("name");

  const isMovie = pathname.startsWith("/movie");

  if (pathname === "/") {
    return (
      <div className="h-full text-gray-400 py-1 space-y-6">
        <p>Discover the best movies and TV shows all in one place!</p>
        <p>
          This is a platform that allows you to quickly search and browse the
          latest movies and TV series. Whether you&#39;re looking for box office
          hits or hidden gems, you&#39;ll find them all. Stay up-to-date with
          the latest releases.
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
