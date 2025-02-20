"use client";

import { useGenres } from "@/components/my-hooks/useGenres";
import Spinner from "@/components/spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type SideNavMobileProps = {
  setOpen: (open: boolean) => void;
};

export default function SideNavMobile({ setOpen }: SideNavMobileProps) {
  const pathname = usePathname();
  const { genresTv, genresMovie, loading } = useGenres();

  const genres = pathname.startsWith("/movies") ? genresMovie : genresTv;
  const isMovie = pathname.startsWith("/movie");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed z-[999] w-full h-full bg-gray-900 bg-opacity-90 overflow-y-auto pt-5 pb-20 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
      {!loading ? (
        <div className="flex flex-col gap-8 items-center text-2xl">
          <p className="text-gray-400">Choose genre:</p>
          {genres.map(({ id, name }) => (
            <Link
              onClick={() => setOpen(false)}
              key={id}
              href={`${isMovie ? "/movies" : "/series"}/genres?id=${id}&name=${encodeURIComponent(name)}&page=1`}
              className="hover:text-primary"
            >
              <p>{name}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      )}
    </div>
  );
}
