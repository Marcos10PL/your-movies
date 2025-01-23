import { fetchCredits, fetchVideos, findById } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Backdrop } from "@/components/item-details/backdrop";
import Crew from "@/components/item-details/crew";
import { Details } from "@/components/item-details/details";
import Layout from "@/components/item-details/layout";
import VideoCarousel from "@/components/carousel/video-carousel";
import type { CastMember, Movie } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  const others = credits.cast.filter(item => !item.profile_path); // without profile path
  const cast = credits.cast.filter(item => item.profile_path); // with profile path

  const crew = credits.crew;

  const directors = crew.filter(member => member.job === "Director");
  const writers = crew.filter(member => member.job === "Writer");
  const screenwriters = crew.filter(member => member.job === "Screenplay");
  const novel = crew.filter(member => member.job === "Novel");

  const videos = await fetchVideos("movie", parseInt(id));
  const trailersAndTeasers = videos?.results.filter(
    item => item.type === "Trailer" || item.type === "Teaser"
  );
  if (!trailersAndTeasers) notFound();

  return (
    <Layout>
      <Backdrop title={movie.title} backdropPath={movie.backdrop_path} />
      <div className="z-30 px-2 pb-2">
        <Details item={movie}>
          <Crew array={directors} header1="Director: " header2="Directors: " />
          <Crew array={writers} header1="Writer: " header2="Writers: " />
          <Crew array={novel} header1="Novel: " />
          <Crew
            array={screenwriters}
            header1="Screenwriter: "
            header2="Screenwriters: "
          />
        </Details>
      </div>
      <div className="z-30">
        <h2 className="px-2">Cast:</h2>
        <div className="text-xl">
          <Carousel data={cast} />
        </div>
        <div className="px-2">
          <Others array={others} />
        </div>
        <hr className="my-6 mx-2 border-dashed opacity-50" />
        <div className="px-2">
          <h2>Teasers and trailers: </h2>
          <VideoCarousel videos={trailersAndTeasers} />
        </div>
      </div>
    </Layout>
  );
}

function Others({ array }: { array: CastMember[] }) {
  if (array.length === 0) return;

  return (
    <div>
      <span>Others: </span>
      {array.map((item, index) => (
        <span key={item.id}>
          {item.name} -{" "}
          <span className="text-emerald-200">{item.character}</span>
          {array.length - 1 !== index && ", "}
        </span>
      ))}
    </div>
  );
}
