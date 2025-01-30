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
import List from "@/components/item-details/list";
import Hr from "@/components/hr";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import Crew from "@/components/item-details/crew";
import VideoCarousel from "@/components/carousels/aspect-video/video-carousel";
import { ca } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Movies",
};

type MovieProps = {
  params: Promise<{ id: string }>;
};

export default async function Movie({ params }: MovieProps) {
  const id = (await params).id;

  const movie = await findById("movie", parseInt(id, 10));
  if (!movie) notFound();

  const credits = await fetchCredits("movie", parseInt(id, 10));
  if (!credits) notFound();

  const { cast, restOfCast } = filterCast(credits.cast);
  const { directors, writers, screenwriters, novel } = filterCrew(credits.crew);

  const videos = await fetchVideos("movie", parseInt(id));
  const { trailersAndTeasers } = filterVideos(videos?.results || []);

  const languages = await fetchLanguages();
  const language = languages?.find(
    lang => lang.iso_639_1 === movie.original_language
  );

  return (
    <Layout
      title={movie.title}
      backdropPath={movie.backdrop_path}
      href="/movies"
    >
      <Details
        title={movie.title}
        releaseDate={movie.release_date}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
        adult={movie.adult}
        language={language?.name}
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
