"use client";

import Title from "@/components/carousels/title";
import { Episode as EpisodeType } from "@/lib/definitions";
import Episode from "./episode";

type SeasonProps = {
  episodes: EpisodeType[];
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
    <div>
      <Title title={title} />
      <div className="px-2">
        {episodes.map(episode => {
          return (
            <Episode
              key={episode.id}
              id={episode.id}
              path={episode.still_path}
              name={episode.name}
              episodeNumber={episode.episode_number}
              overview={episode.overview}
              realeaseDate={episode.air_date}
              seasonNr={seasonNr}
            />
          );
        })}
      </div>
    </div>
  );
}
