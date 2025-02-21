import Image from "next/image";
import CookiesSwitch from "../cookies/cookies-switch";

export default function Footer() {
  return (
    <div className="2xl text-sm p-3 text-gray-300 opacity-70">
      <CookiesSwitch />

      <div className="pt-5 flex flex-col">
        <a href="https://www.themoviedb.org/" target="_blank">
          <Image
            src="/img/tmdb-logo.svg"
            width={100}
            height={100}
            alt="TMDB logo"
            className="w-20"
          />
        </a>
        <p className="pt-1 text-teal-200">
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>

      <p className="pt-3">2024 &copy; All rights reserved</p>
    </div>
  );
}
