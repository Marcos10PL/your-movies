import {
  fetchCredits,
  fetchLanguages,
  fetchVideos,
  findById,
} from "@/api/actions";
import { Details } from "@/components/item-details/details";
import Layout from "@/components/item-details/layout";
import type { Movie } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Carousels from "@/components/item-details/carousels";

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

  // cast
  const cast = credits.cast.filter(item => item.profile_path); // with profile path
  const restOfCast = credits.cast.filter(item => !item.profile_path); // without profile path

  // crew
  const crew = credits.crew;
  const directors = crew.filter(member => member.job === "Director");
  const writers = crew.filter(member => member.job === "Writer");
  const screenwriters = crew.filter(member => member.job === "Screenplay");
  const novel = crew.filter(member => member.job === "Novel");

  // trailers and teasers
  const videos = await fetchVideos("movie", parseInt(id));
  const trailers =
    videos?.results.filter(item => item.type === "Trailer") || [];
  const teasers = videos?.results.filter(item => item.type === "Teaser") || [];
  const trailersAndTeasers = [...trailers, ...teasers];

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
      />
      <Carousels
        trailersAndTeasers={trailersAndTeasers}
        cast={cast}
        restOfCast={restOfCast}
        crew={crew}
      />
    </Layout>
  );
}
