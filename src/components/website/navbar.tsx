"use client";

import { HomeIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Movies", href: "/movies", icon: FilmIcon },
  { name: "TV Series", href: "/series", icon: TvIcon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="text-white flex flex-col md:flex-row items-center justify-center gap-10 bg-gradient-to-b from-slate-800 to-gray-950 h-12">
      <p className="uppercase text-xl text-primary">your movies</p>
      <div className="flex gap-2 ">
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
    </nav>
  );
}
