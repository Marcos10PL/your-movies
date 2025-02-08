"use client";

import SearchBar from "@/components/search/search-bar";
import SearchButton from "@/components/search/search-button";
import { links } from "@/lib/variables";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavbarDesktop() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "text-white bg-gradient-to-b from-slate-800 to-gray-950 z-[1000] grid-cols-[1fr_33.5rem_8.5rem_1fr] grid-rows-[1fr] py-2 hidden md:grid",
        isOpen && "grid-rows-2 lg:grid-rows-1"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center gap-2 col-start-2",
          isOpen && "col-span-2 lg:col-start-2 lg:col-span-1"
        )}
      >
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

      <div
        className={clsx(
          "flex items-center col-span-2",
          isOpen ? "ml-0 lg:ml-10 row-span-2 col-span-full lg:col-span-2" : 'ml-10'
        )}
      >
        {!isOpen && <SearchButton setIsOpen={setIsOpen} />}

        {isOpen && <SearchBar setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}
