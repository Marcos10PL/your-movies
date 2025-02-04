"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import clsx from "clsx";
import { links } from "@/lib/variables";

export default function NavbarMobile() {
  const pathname = usePathname();

  return (
    <div className="text-white bg-gradient-to-b from-slate-900 to-gray-950 z-[1000] h-14 fixed bottom-0 w-full flex justify-center items-center border-t md:hidden">
      <div className="flex items-center justify-between gap-2 col-start-2">
        {links.map(({ name, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex flex-col items-center justify-center px-3 rounded-md transition-colors min-w-24",
                isActive && "text-primary shadow-md  pointer-events-none"
              )}
            >
              <Icon className="w-8" />
              <p className="text-xs"> {name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
