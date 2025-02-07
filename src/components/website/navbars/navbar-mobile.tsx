"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import clsx from "clsx";
import { links } from "@/lib/variables";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SideNavMobile from "../side-navs/side-nav-mobile";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="text-white bg-gradient-to-b from-slate-900 to-gray-950 z-[1000] h-14 fixed bottom-0 w-full flex justify-center items-center border-t md:hidden">
        <div className="flex items-center justify-center gap-5 col-start-2 w-full *:flex *:flex-col *:items-center *:justify-center *:px-3 *:min-w-16">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                key={name}
                href={href}
                className={clsx(
                  "hover:text-primary",
                  isActive && "text-primary shadow-md pointer-events-none"
                )}
              >
                <Icon className="w-8" />
                <p className="text-xs"> {name}</p>
              </Link>
            );
          })}
          <button
            onClick={() => {
              setOpen(!open);
            }}
            disabled={
              !pathname.startsWith("/movies") && !pathname.startsWith("/series")
            }
            className={clsx(
              !pathname.startsWith("/movies") &&
                !pathname.startsWith("/series") &&
                "text-gray-400 opacity-70 pointer-events-none"
            )}
          >
            {!open ? <TagIcon className="w-8" /> : <XMarkIcon className="w-8" />}

            <p className="text-xs">Genres</p>
          </button>
        </div>
      </div>

      {open && <SideNavMobile setOpen={setOpen} />}
    </>
  );
}
