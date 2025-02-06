import {
  fetchSeasonCredits,
  fetchSeasonDetails,
  fetchSeasonVideos,
} from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import VideoCarousel from "@/components/carousels/aspect-video/video-carousel";
import Hr from "@/components/hr";
import Crew from "@/components/item/crew";
import Details from "@/components/item/details";
import Layout from "@/components/item/layout";
import List from "@/components/item/list";
import Episodes from "@/components/item/tv-series/episodes";
import { filterCast, filterCrew, filterVideos, isFutureDate } from "@/lib/utils";
import { notFound } from "next/navigation";

type SeasonProps = {
  params: Promise<{ id: string; seasonNr: string }>;
};

export default async function Season({ params }: SeasonProps) {
  const seasonNr = parseInt((await params).seasonNr, 10);
  const seriesId = parseInt((await params).id, 10);

  const [season, credits, videos] = await Promise.all([
    await fetchSeasonDetails(seriesId, seasonNr),
    await fetchSeasonCredits(seriesId, seasonNr),
    await fetchSeasonVideos(seriesId, seasonNr),
  ]);

  if (!season || !credits) return notFound();

  const { cast, restOfCast } = filterCast(credits.cast);
  const { directors, writers, screenwriters, novel } = filterCrew(credits.crew);
  const { trailersAndTeasers } = filterVideos(videos?.results || []);
  const dateInFuture = isFutureDate(season.air_date);

  return (
    <Layout href={`/series/${seriesId}`}>
      <Details
        title={season.name}
        releaseDate={season.air_date}
        overview={season.overview}
        voteAverage={season.vote_average}
        noWrap
      />

      <Crew
        directors={directors}
        writers={writers}
        screenwriters={screenwriters}
        novel={novel}
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

      <Hr />
      <Episodes
        episodes={season.episodes}
        title={`Episodes (${season.episodes.length}): `}
        seasonNr={seasonNr}
        dateInFuture={dateInFuture}
      />

      {cast.length > 0 && (
        <>
          <Hr />
          <Carousel data={cast} title="Cast" noLink overlayAlwaysVisible />
        </>
      )}

      {restOfCast.length > 0 && (
        <>
          <Hr />
          <List array={restOfCast} title="Rest of the cast" />
        </>
      )}

      {credits.crew.length > 0 && (
        <>
          <Hr />
          <List array={credits.crew} title="Crew" />
        </>
      )}
    </Layout>
  );
}
