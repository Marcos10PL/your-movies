import { fetchSeasonDetails, findById } from "@/api/actions";
import Hr from "@/components/hr";
import Layout from "@/components/item-details/layout";
import Episodes from "@/components/item-details/tv-series/episodes";
import { notFound } from "next/navigation";

type SeasonProps = {
  params: Promise<{ id: string; nr: string }>;
};

export default async function Season({ params }: SeasonProps) {
  const nr = (await params).nr;
  const id = (await params).id;

  const season = await fetchSeasonDetails(parseInt(id, 10), parseInt(nr, 10));
  if (!season) return notFound();

  console.log(season);

  return (
    <Layout href={`/series/${id}`}>
      <div className="*:pb-3 px-2">
        <h1 className="text-2xl text-primary">
          {season.name}{" "}
          <span className="opacity-60 text-2xl">
            ({new Date(season.air_date).getFullYear()})
          </span>
        </h1>
        {season.overview && <p>{season.overview}</p>}
        {season.air_date && <p>Release date: {season.air_date}</p>}
      </div>
      <Hr />
      <Episodes
        episodes={season.episodes}
        title="Episodes: "
        nr={parseInt(nr, 10)}
        id={parseInt(id, 10)}
      />
    </Layout>
  );
}
