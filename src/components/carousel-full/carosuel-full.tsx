"use client";

import { Movie } from "@/lib/definitions";

type CarouselFullProps = {
  data: Movie[];
};

export default function CarouselFull({ data }: CarouselFullProps) {
  return (
    <div className="relative w-full border-b-2 border-primary">
      <img
        src={`https://image.tmdb.org/t/p/w1280${data[0].backdrop_path}`}
        alt={data[0].title}
        className="w-full md:w-2/3 float-right"
      />
      <div className="clear-both" />
      <div className="absolute top-0 right-0 bottom-0 w-2/3 bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute inset-0 w-1/3 bg-black"></div>
    </div>
  );
}
