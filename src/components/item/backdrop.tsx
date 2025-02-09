"use client";

import Image from "next/image";

type BackdropProps = {
  title: string;
  backdropPath: string;
};

export function Backdrop({ title, backdropPath }: BackdropProps) {
  return (
    <div className="relative md:absolute top-0 w-full z-0 opacity-70 aspect-video">
      {backdropPath && (
        <Image
          src={`https://image.tmdb.org/t/p/w1280${backdropPath}`}
          alt={title}
          fill
          priority
          blurDataURL="/img/blur.png"
          placeholder="blur"
        />
      )}

      {/* bottom */}
      <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-gray-950 to-transparent" />
      {/* left */}
      <div className="hidden md:block absolute md:w-3/5 xl:w-2/6 left-0 inset-0 bg-gradient-to-r from-gray-950 to-transparent" />
      {/* top */}
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-gray-950 to-transparent" />
    </div>
  );
}
