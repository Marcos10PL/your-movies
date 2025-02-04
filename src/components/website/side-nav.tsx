"use client";

import {
  StarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SearchBar from "../search/search-bar";
import { useEffect, useState } from "react";
import clsx from "clsx";
import SearchButton from "../search/search-button";

const links = [
  { name: "Favourites", href: "/favourites", icon: StarIcon },
  { name: "Watchlist", href: "/watchlist", icon: ClockIcon },
];

export default function SideNav() {
  return <div>SideNav</div>;
}

/* <div className="flex md:flex-col justify-center items-start gap-5">
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
</div> */
