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
import Carousels from "@/components/item-details/carousels";
import { filterCast, filterCrew, filterVideos } from "@/lib/utils";

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

  console.log(tvSeries);

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

  return (
    <Layout title={tvSeries.name} backdropPath={tvSeries.backdrop_path}>
      <Details
        item={tvSeries}
        directors={createdBy}
        writers={writers}
        screenwriters={screenwriters}
        novel={novel}
        language={language}
      />
      <Carousels
        trailersAndTeasers={trailersAndTeasers}
        cast={cast}
        restOfCast={restOfCast}
        crew={credits.crew}
      />
    </Layout>
  );
}
