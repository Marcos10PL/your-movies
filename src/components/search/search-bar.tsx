"use client";

import { SearchResults } from "@/lib/definitions";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { movieAndSeriesArray } from "@/lib/utils";
import ResultHints from "./result-hints";

type SearchBarProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function SearchBar({ setIsOpen }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults["results"]>([]);
  const debouncedSearchQuery = useDebounce(query, 500);
  const searchBarRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setIsOpen(false);
      router.push(`/search?query=${query}&page=1`);
    },
    [query, router, setIsOpen]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
      } catch (e) {
        console.error(e);
        return [];
      } finally {
        setIsSearching(false);
      }
    };
    search();
  }, [debouncedSearchQuery]);

  const resultsFiltered = movieAndSeriesArray(results);

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center justify-center gap-1 w-full md:px-4 md:mt-2 lg:mt-0 lg:pl-0 z-[1000] m-auto"
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

      {isSearching && <Searching />}

      {resultsFiltered.length > 0 && (
        <div className="absolute top-[35px] lg:top-[30px] w-[calc(100%-4.5rem)] md:w-[calc(100%-6.5rem)] lg:w-[calc(100%-5.5rem)] ml-4 p-2 rounded-md bg-slate-700 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <ResultHints results={resultsFiltered} setIsOpen={setIsOpen} />
        </div>
      )}
    </form>
  );
}

function Searching() {
  return (
    <div className="absolute top-[35px] lg:top-[30px] w-[calc(100%-4.5rem)] md:w-[calc(100%-6.5rem)] lg:w-[calc(100%-5.5rem)] ml-4 p-2 rounded-md bg-slate-700">
      Searching...
    </div>
  );
}
