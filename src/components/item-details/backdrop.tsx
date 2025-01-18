"use client";

import { useEffect, useState } from "react";
import Spinner from "../spinner";

type BackdropProps = {
  title: string;
  backdropPath: string;
};

export function Backdrop({ title, backdropPath }: BackdropProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [backdropPath]);

  return (
    <div className="absolute top-0 w-full z-0">
      {backdropPath &&
        (loading ? (
          <div className="opacity-50 absolute w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w1280${backdropPath}/`}
            alt={title}
            className="w-full h-full opacity-70 rounded-xl"
          />
        ))}
      <div className="absolute bottom-0 w-full h-1/3 md:h-2/3 bg-gradient-to-t from-gray-950 to-transparent" />
      <div className="absolute hidden md:block left-0 inset-0 w-2/3 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-gray-950 to-transparent" />
      <div className="absolute hidden md:block left-3/4 inset-0 w-1/4 bg-gradient-to-l from-gray-950 to-transparent" />
    </div>
  );
}
