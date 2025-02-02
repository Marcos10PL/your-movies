import {
  fetchCredits,
  fetchLanguages,
  fetchVideos,
  findById,
} from "@/api/actions";
import Details from "@/components/item/details";
import Layout from "@/components/item/layout";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { filterCast, filterCrew, filterVideos } from "@/lib/utils";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import VideoCarousel from "@/components/carousels/aspect-video/video-carousel";
import Hr from "@/components/hr";
import List from "@/components/item/list";
import Crew from "@/components/item/crew";

export const metadata: Metadata = {
  title: "TV Series",
};

type TvSeriesProps = {
  params: Promise<{ id: string }>;
};

export default async function TvSeries({ params }: TvSeriesProps) {
  const id = (await params).id;

  const [tvSeries, credits, videos, languages] = await Promise.all([
    findById("tv", parseInt(id, 10)),
    fetchCredits("tv", parseInt(id, 10)),
    fetchVideos("tv", parseInt(id, 10)),
    fetchLanguages(),
  ]);

  if (!tvSeries || !credits) notFound();

  const { cast, restOfCast } = filterCast(credits.cast);
  const { directors, writers, screenwriters, novel } = filterCrew(credits.crew);
  const { trailersAndTeasers } = filterVideos(videos?.results || []);
  const createdBy = [...tvSeries.created_by, ...directors];
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

      {seasons.length > 0 && (
        <>
          <Hr />
          <Carousel data={seasons} title="Seasons" overlayAlwaysVisible />
        </>
      )}

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
          <Carousel data={cast} title="Main cast" noLink overlayAlwaysVisible />
        </>
      )}

      {restOfCast.length > 0 && (
        <>
          <Hr />
          <List array={restOfCast} title="Rest of the main cast" />
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
