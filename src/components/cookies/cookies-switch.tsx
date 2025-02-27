"use client";

import clsx from "clsx";
import { LS_KEYS } from "@/lib/variables";
import useLocalStorage from "../my-hooks/useLocalStorage";

export default function CookiesSwitch() {
  const [accepted, setAccepted] = useLocalStorage(
    LS_KEYS.cookiesAccepted,
    false
  );

  const toggleCookie = () => {
    setAccepted(!accepted);
    window.location.reload();
  };

  return (
    <button className="flex items-center space-x-2" onClick={toggleCookie}>
      <p className="uppercase">Cookies</p>
      <div className="relative">
        <div
          className={clsx(
            "block w-9 h-5 rounded-full",
            accepted ? "bg-emerald-500" : "bg-gray-400"
          )}
        ></div>
        <div
          className={clsx(
            "absolute w-3 h-3 bg-white rounded-full top-1 left-1 transition-transform duration-300 ease-in-out",
            accepted && "translate-x-4"
          )}
        ></div>
      </div>
    </button>
  );
}
