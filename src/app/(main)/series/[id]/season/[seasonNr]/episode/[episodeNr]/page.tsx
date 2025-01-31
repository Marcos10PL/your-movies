import { fetchEpisodeDetails } from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import Hr from "@/components/hr";
import Crew from "@/components/item-details/crew";
import { Details } from "@/components/item-details/details";
import Layout from "@/components/item-details/layout";
import List from "@/components/item-details/list";
import { filterCast } from "@/lib/utils";
import { notFound } from "next/navigation";

type EpisodeProps = {
  params: Promise<{ id: string; seasonNr: string; episodeNr: string }>;
};

export default async function Episode({ params }: EpisodeProps) {
  const { id, seasonNr, episodeNr } = await params;

  const episode = await fetchEpisodeDetails(
    parseInt(id, 10),
    parseInt(seasonNr, 10),
    parseInt(episodeNr, 10)
  );
  if (!episode) return notFound();

  const directors = episode.crew.filter(person => person.job === "Director");
  const writers = episode.crew.filter(person => person.job === "Writer");

  const { cast: guestStars, restOfCast: restOfGuestStars } = filterCast(
    episode.guest_stars
  );

  return (
    <Layout
      href={`/series/${id}/season/${seasonNr}`}
      title={episode.name}
      backdropPath={episode.still_path}
    >
      <Details
        title={`${episodeNr}. ${episode.name}`}
        releaseDate={episode.air_date}
        overview={episode.overview}
        voteAverage={episode.vote_average}
        voteCount={episode.vote_count}
      />

      <div className="px-2 *:pb-1">
        {episode.season_number && <p>Season number: {episode.season_number}</p>}
        {episode.episode_number && (
          <p>Episode number: {episode.episode_number}</p>
        )}
        {episode.runtime && <p>Runtime: {episode.runtime} minutes</p>}
      </div>

      <Crew directors={directors} writers={writers} />

      {guestStars.length > 0 && (
        <>
          <Hr />
          <Carousel
            data={guestStars}
            title="Guest stars"
            noLink
            overlayAlwaysVisible
          />
        </>
      )}

      {restOfGuestStars.length > 0 && (
        <>
          <Hr />
          <List array={restOfGuestStars} title="Rest of guest stars" />
        </>
      )}
    </Layout>
  );
}
