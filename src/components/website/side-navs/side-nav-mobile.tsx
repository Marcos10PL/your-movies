import Spinner from "@/components/spinner";
import { Genres } from "@/lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_KEY = process.env.TMDB_API_KEY;

type SideNavMobileProps = {
  setOpen: (open: boolean) => void;
};

export default function SideNavMobile({ setOpen }: SideNavMobileProps) {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<Genres[]>([]);
  const pathname = usePathname();

  const isMovie = pathname.startsWith("/movie");
  const type = isMovie ? "movie" : "tv";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`/genre?type=${type}`);

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
  }, [pathname, type]);

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
