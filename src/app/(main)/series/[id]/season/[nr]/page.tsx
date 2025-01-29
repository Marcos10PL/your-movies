import { fetchSeasonDetails, findById } from "@/api/actions";
import Hr from "@/components/hr";
import Layout from "@/components/item-details/layout";
import Image from "next/image";
import { notFound } from "next/navigation";

type SeasonsProps = {
  params: Promise<{ id: string; nr: string }>;
};

export default async function Season({ params }: SeasonsProps) {
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
      <div className="px-2">
        <h2>Episodes: </h2>
        {season.episodes.map(episode => (
          <div
            key={episode.id}
            className="bg-gray-900 rounded-lg my-4 flex flex-col md:flex-row items-center justify-center overflow-hidden"
          >
            <div className="relative w-full aspect-video md:w-1/3">
              <Image
                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                alt={episode.name}
                sizes="1x"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full px-3 py-2 md:w-2/3">
              <h2 className="text-primary">
                {episode.episode_number}. {episode.name}
              </h2>
              <p>{episode.overview}</p>
              <p>Release date: {episode.air_date}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
