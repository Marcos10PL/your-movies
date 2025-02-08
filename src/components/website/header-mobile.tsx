"use client";

import SearchBar from "../search/search-bar";
import { useEffect, useState } from "react";
import clsx from "clsx";
import SearchButton from "../search/search-button";

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={clsx(
        "fixed z-[998] top-0 left-0 w-full px-2 py-3 md:hidden bg-gradient-to-b from-slate-800 to-gray-950 flex justify-between items-center transition-transform duration-300",
        showMenu ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {!isOpen && (
        <p className="uppercase text-xl text-primary text-center">
          your movies
        </p>
      )}

      {!isOpen && <SearchButton setIsOpen={setIsOpen} />}

      {isOpen && <SearchBar setIsOpen={setIsOpen} />}
    </div>
  );
}
