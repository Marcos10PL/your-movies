import { HomeIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Movies", href: "/movies", icon: FilmIcon },
  { name: "Series", href: "/series", icon: TvIcon },
];

export default function Navbar() {
  return (
    <nav className="p-5 text-primary flex flex-col md:flex-row items-center gap-5 md:gap-20 bg-transparent">
      <p className="uppercase text-xl">your movies</p>
      <div className="flex gap-5">
        {links.map(({ name, href, icon: Icon }) => {
          return (
            <Link
              key={name}
              href={href}
              className="flex items-center justify-center gap-2"
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
