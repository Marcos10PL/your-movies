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

  // language
  const languages = await fetchLanguages();
  const language = languages?.find(
    lang => lang.iso_639_1 === movie.original_language
  );

  return (
    <Layout title={movie.title} backdropPath={movie.backdrop_path}>
      <Details
        item={movie}
        directors={directors}
        writers={writers}
        screenwriters={screenwriters}
        novel={novel}
        language={language}
        trailersAndTeasers={trailersAndTeasers}
        cast={cast}
        restOfCast={restOfCast}
        crew={credits.crew}
      />
    </Layout>
  );
}
