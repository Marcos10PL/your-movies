"use client";

import { SearchResults } from "@/lib/definitions";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { links } from "@/lib/variables";
import { movieAndSeriesArray } from "@/lib/utils";

type SearchBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function SearchBar({ isOpen, setIsOpen }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults["results"]>([]);
  const debouncedSearchQuery = useDebounce(query, 500);
  const searchBarRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(`/search?query=${query}&page=1`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchQuery) return;

      setIsSearching(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchQuery}&include_adult=false&page=1&language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (!data || data.results.length === 0) {
          return [];
        }

        setResults(data.results || []);
      } catch (error) {
        return [];
      } finally {
        setIsSearching(false);
      }
    };
    search();
  }, [debouncedSearchQuery]);

  const icons = links.map(link => ({
    icon: link.icon,
    href: link.href,
  }));

  const resultsFiltered = movieAndSeriesArray(results);

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center justify-center gap-1 w-full px-4 md:mt-2 lg:mt-0 lg:pl-0 z-[1000]"
      ref={searchBarRef}
    >

      <button
        type="submit"
        className="hover:bg-slate-800 hover:text-primary py-1 px-2 rounded-md transition-colors"
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className="border rounded-md py-1 px-2 lg:py-0 w-full bg-slate-700"
        autoFocus
      />
      <button
        onClick={() => setIsOpen(false)}
        className="text-gray-400 hover:text-gray-100 transition-colors"
      >
        <XCircleIcon className="w-6 h-6" />
      </button>

      {isSearching && (
        <div className="absolute top-[35px] lg:top-[30px] w-[calc(100%-6.5rem)] ml-4 p-2 rounded-md bg-slate-700">
          Searching...
        </div>
      )}

      {resultsFiltered.length > 0 && (
        <div className="absolute top-[35px] lg:top-[30px] w-[calc(100%-6.5rem)] lg:w-[calc(100%-5.5rem)] ml-4 p-2 rounded-md bg-slate-700">
          <div className="flex flex-col">
            {resultsFiltered.map(item => {
              const name = "title" in item ? item.title : item.name;
              const href =
                "title" in item ? `/movies/${item.id}` : `/series/${item.id}`;
              const Icon = icons.find(
                icon => icon.href === `/${href.split("/")[1]}`
              )?.icon;

              return (
                <Link
                  href={href}
                  key={item.id}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-gray-500 last:border-b-0 last:rounded-b-md first:rounded-t-md hover:bg-gray-800 p-1 transition-colors hover:text-primary"
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="min-w-6 h-6" />}
                    <p>{name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
}
