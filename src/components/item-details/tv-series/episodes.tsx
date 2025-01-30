"use client";

import Title from "@/components/carousels/title";
import Error from "@/components/error";
import Hr from "@/components/hr";
import { Episode } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

type SeasonProps = {
  episodes: Episode[];
  title: string;
  seasonNr: number;
};

export default function Episodes({ episodes, title, seasonNr }: SeasonProps) {
  if (
    (episodes[0].overview === "" && episodes[0].still_path === null) ||
    episodes.length === 0
  ) {
    return null;
  }

  return (
    <>
      <Hr />
      <Title title={title} />
      <div className="px-2 mt-2">
        {episodes.map(episode => {
          return (
            <div
              key={episode.id}
              className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800 mb-4"
            >
              <div className="flex flex-col md:flex-row justify-center border-b-2 border-gray-800">
                <div className="relative w-full aspect-video md:w-1/3 xl:w-1/5">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                    alt={episode.name}
                    sizes="1x"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-2/3 px-3 py-2 xl:w-4/5">
                  <h2 className="text-primary">
                    {episode.episode_number}. {episode.name}
                  </h2>
                  <p>{episode.overview}</p>
                  <div className="hidden">
                    <p>Release date: {episode.air_date}</p>
                  </div>
                </div>
              </div>
              <Link
                className="p-2 bg-slate-950 hover:bg-gray-900 duration-150 hover:text-primary h-full text-center"
                href={`${seasonNr}/episode/${episode.episode_number}`}
              >
                Show more...
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
