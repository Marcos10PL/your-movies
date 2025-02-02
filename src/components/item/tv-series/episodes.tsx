"use client";

import Title from "@/components/carousels/title";
import Spinner from "@/components/spinner";
import { Episode } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SeasonProps = {
  episodes: Episode[];
  title: string;
  seasonNr: number;
  dateInFuture: boolean;
};

export default function Episodes({
  episodes,
  title,
  seasonNr,
  dateInFuture,
}: SeasonProps) {
  const [loading, setLoading] = useState(true);

  if (episodes.length === 0) return null;

  if (dateInFuture) {
    return (
      <div className="px-2">
        <p>This season will be have {episodes.length} episodes.</p>
        {episodes[0].name !== "Episode 1" &&
          episodes.map(episode => (
            <p className="pb-1" key={episode.id}>
              {episode.episode_number}. {episode.name}
            </p>
          ))}
      </div>
    );
  }

  return (
    <>
      <Title title={title} />
      <div className="px-2">
        {episodes.map(episode => {
          return (
            <div
              key={episode.id}
              className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800 mb-4"
            >
              <div className="flex flex-col md:flex-row justify-center border-b-2 border-gray-800">
                <div className="relative w-full aspect-video md:w-1/3 xl:w-1/5">
                  {episode.still_path ? (
                    <>
                      {loading && <Loading />}
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${episode.still_path}/`}
                        alt={episode.name}
                        fill
                        sizes="1x"
                        className="object-cover"
                        onLoad={() => setLoading(false)}
                      />
                    </>
                  ) : (
                    <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-300 group-hover:scale-105 z-50">
                      <p className="text-white">No image available</p>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 px-3 py-2 xl:w-4/5">
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

function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
