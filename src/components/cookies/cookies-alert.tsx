"use client";

import { useEffect, useState } from "react";
import useLocalStorage from "../my-hooks/useLocalStorage";
import { LS_KEYS } from "@/lib/variables";

export default function CookiesAlert() {
  const [accepted, setAccepted] = useLocalStorage(
    LS_KEYS.cookiesAccepted,
    false
  );
  const [isOpen, setIsOpen] = useLocalStorage(LS_KEYS.cookiesOpen, true);
  const [loading, setLoading] = useState(!accepted);

  const handleClick = (accepted: boolean) => {
    setAccepted(accepted);
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    setLoading(false);
  }, [accepted]);

  if (accepted || loading) return null;

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 z-[1000] flex justify-center items-center">
        <div className="text-lg md:text-xl xl:text-2xl p-5 mx-5 text-justify w-full md:w-[66%] lg:w-1/2 border-2 rounded-lg border-gray-400 bg-slate-900">
          <p>
            This website uses embedded YouTube videos, which may store cookies
            on your device. For more information, please refer to{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-emerald-200 transition-colors"
            >
              Google&#39;s Cookie Policy
            </a>{" "}
            for YouTube.
          </p>

          <div className="flex items-center justify-center mt-5 gap-10 *:transition-colors *:uppercase">
            <button
              onClick={() => handleClick(true)}
              className="text-emerald-400 hover:text-emerald-200"
            >
              Accept
            </button>
            <button
              onClick={() => handleClick(false)}
              className="text-red-300 hover:text-red-200"
            >
              Decline
            </button>
          </div>

          <p className="mt-5 text-gray-400 text-center">
            You can change this option in the footer.
          </p>
        </div>
      </div>
    )
  );
}
