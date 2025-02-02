import {
  fetchEpisodeCredits,
  fetchEpisodeDetails,
  fetchEpisodeVideos,
} from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import VideoCarousel from "@/components/carousels/aspect-video/video-carousel";
import Hr from "@/components/hr";
import Crew from "@/components/item/crew";
import Details from "@/components/item/details";
import Layout from "@/components/item/layout";
import List from "@/components/item/list";
import { filterCast, filterCrew, filterVideos } from "@/lib/utils";
import { notFound } from "next/navigation";

type EpisodeProps = {
  params: Promise<{ id: string; seasonNr: string; episodeNr: string }>;
};

export default async function Episode({ params }: EpisodeProps) {
  const seasonNr = parseInt((await params).seasonNr, 10);
  const seriesId = parseInt((await params).id, 10);
  const episodeNr = parseInt((await params).episodeNr, 10);

  const [episode, credits, videos] = await Promise.all([
    await fetchEpisodeDetails(seriesId, seasonNr, episodeNr),
    await fetchEpisodeCredits(seriesId, seasonNr, episodeNr),
    await fetchEpisodeVideos(seriesId, seasonNr, episodeNr),
  ]);

  if (!episode || !credits) return notFound();

  const { cast: guestStars, restOfCast: restOfGuestStars } = filterCast(
    episode.guest_stars
  );

  const { cast, restOfCast } = filterCast(credits.cast);
  const { directors, writers } = filterCrew(credits.crew);
  const { trailersAndTeasers } = filterVideos(videos?.results || []);

  return (
    <Layout
      href={`/series/${seriesId}/season/${seasonNr}`}
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

      {trailersAndTeasers.length > 0 && (
        <>
          <Hr />
          <VideoCarousel
            videos={trailersAndTeasers}
            title="Trailers and Teasers"
          />
        </>
      )}

      <div className="px-2 *:pb-1">
        {episode.season_number !== 0 && (
          <p>Season number: {episode.season_number}</p>
        )}
        {episode.episode_number !== 0 && (
          <p>Episode number: {episode.episode_number}</p>
        )}
        {episode.runtime !== 0 && <p>Runtime: {episode.runtime} minutes</p>}
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

      {cast.length > 0 && (
        <>
          <Hr />
          <Carousel data={cast} title="Cast" noLink overlayAlwaysVisible />
        </>
      )}

      {restOfGuestStars.length > 0 && (
        <>
          <Hr />
          <List array={restOfGuestStars} title="Rest of guest stars" />
        </>
      )}

      {restOfCast.length > 0 && (
        <>
          <Hr />
          <List array={restOfCast} title="Rest of the cast" />
        </>
      )}
    </Layout>
  );
}
