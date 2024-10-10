import { StarIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const links = [
  { name: "Favourites", href: "/favourites", icon: StarIcon },
  { name: "Watchlist", href: "/watchlist", icon: ClockIcon },
];

export default function SideNav() {
  return (
    <nav className="md:p-5 p-0">
      <div className="flex md:flex-col justify-center items-start gap-5">
        {links.map(({ name, href, icon: Icon }) => {
          return (
            <Link
              key={name}
              href={href}
              className="flex items-center justify-center gap-2"
            >
              <Icon className="w-6" />
              <p>{name}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
