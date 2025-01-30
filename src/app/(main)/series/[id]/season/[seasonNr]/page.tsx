import { fetchSeasonDetails } from "@/api/actions";
import { Details } from "@/components/item-details/details";
import Layout from "@/components/item-details/layout";
import Episodes from "@/components/item-details/tv-series/episodes";
import { notFound } from "next/navigation";

type SeasonProps = {
  params: Promise<{ id: string; seasonNr: string }>;
};

export default async function Season({ params }: SeasonProps) {
  const seasonNr = (await params).seasonNr;
  const id = (await params).id;

  const season = await fetchSeasonDetails(
    parseInt(id, 10),
    parseInt(seasonNr, 10)
  );
  if (!season) return notFound();
  
  return (
    <Layout href={`/series/${id}`}>
      <Details
        title={season.name}
        releaseDate={season.air_date}
        overview={season.overview}
        voteAverage={season.vote_average}
        noWrap
      />
      <Episodes
        episodes={season.episodes}
        title="Episodes: "
        seasonNr={parseInt(seasonNr, 10)}
      />
    </Layout>
  );
}
