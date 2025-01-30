import {
  fetchCredits,
  fetchLanguages,
  fetchVideos,
  findById,
} from "@/api/actions";
import { Details } from "@/components/item-details/details";
import Layout from "@/components/item-details/layout";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { filterCast, filterCrew, filterVideos } from "@/lib/utils";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import VideoCarousel from "@/components/carousels/aspect-video/video-carousel";
import Hr from "@/components/hr";
import List from "@/components/item-details/list";
import Crew from "@/components/item-details/crew";

export const metadata: Metadata = {
  title: "TV Series",
};

type TvSeriesProps = {
  params: Promise<{ id: string }>;
};

export default async function TvSeries({ params }: TvSeriesProps) {
  const id = (await params).id;

  const tvSeries = await findById("tv", parseInt(id, 10));
  if (!tvSeries) notFound();

  const credits = await fetchCredits("tv", parseInt(id, 10));
  if (!credits) notFound();

  const { cast, restOfCast } = filterCast(credits.cast);
  const { directors, writers, screenwriters, novel } = filterCrew(credits.crew);
  const createdBy = [...tvSeries.created_by, ...directors];

  const videos = await fetchVideos("tv", parseInt(id));
  const { trailersAndTeasers } = filterVideos(videos?.results || []);

  const languages = await fetchLanguages();
  const language = languages?.find(
    lang => lang.iso_639_1 === tvSeries.original_language
  );

  const seasons = tvSeries.seasons;
  return (
    <Layout
      title={tvSeries.name}
      backdropPath={tvSeries.backdrop_path}
      href="/series"
    >
      <Details
        title={tvSeries.name}
        releaseDate={tvSeries.first_air_date}
        overview={tvSeries.overview}
        voteAverage={tvSeries.vote_average}
        voteCount={tvSeries.vote_count}
        adult={tvSeries.adult}
        language={language?.name}
      />

      <Crew
        directors={createdBy}
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

      {seasons.length > 0 && (
        <>
          <Hr />
          <Carousel data={seasons} title="Seasons" overlayAlwaysVisible />
        </>
      )}
    </Layout>
  );
}
