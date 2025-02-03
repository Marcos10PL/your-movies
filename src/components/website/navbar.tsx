"use client";

import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  MagnifyingGlassIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Movies", href: "/movies", icon: FilmIcon },
  { name: "TV Series", href: "/series", icon: TvIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(query);
    router.push(`/search?q=${query}`);
  };

  return (
    <nav className="text-white bg-gradient-to-b from-slate-800 to-gray-950 z-[1000] grid grid-cols-[1fr_33.5rem_8.5rem_1fr] grid-rows-1 py-2">
      <div className="flex items-center justify-center gap-2 col-start-2">
        <p className="uppercase text-xl text-primary text-center mr-12">
          your movies
        </p>
        {links.map(({ name, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex items-center justify-center gap-2 hover:bg-slate-800 hover:text-primary py-1 px-3 rounded-md transition-colors",
                isActive &&
                  "text-primary shadow-md shadow-black bg-slate-900 pointer-events-none"
              )}
            >
              <Icon className="w-6" />
              {name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center ml-10 col-span-2">
        {!isOpen && (
          <button
            className="flex items-center justify-center gap-2 hover:text-primary rounded-md pl-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MagnifyingGlassIcon className="w-6" />
            <p>Search</p>
          </button>
        )}
        {isOpen && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-1 w-full pr-3"
          >
            <button type="submit" className="hover:bg-slate-800 hover:text-primary py-1 px-2 rounded-md transition-colors">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="border text-black rounded-md px-2 w-4/5"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
