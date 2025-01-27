import { CastMember, CrewMember, Video } from "@/lib/definitions";
import Carousel from "../carousel/carousel";
import VideoCarousel from "../carousel/video-carousel";

type CarouselsProps = {
  trailersAndTeasers: Video[];
  cast: CastMember[];
  restOfCast: CastMember[];
  crew: CrewMember[];
};

export default function Carousels({
  trailersAndTeasers,
  cast,
  restOfCast,
  crew,
}: CarouselsProps) {
  return (
    <div>
      {trailersAndTeasers.length > 0 && (
        <>
          <Hr />
          <h2 className="px-2">Trailers and teasers: </h2>
          <VideoCarousel videos={trailersAndTeasers} />
        </>
      )}
      {cast.length > 0 && (
        <>
          <Hr />
          <h2 className="px-2">Cast: </h2>
          <Carousel data={cast} />
        </>
      )}
      {(restOfCast.length > 0 || crew.length > 0) && (
        <>
          <Hr />
          <List array={restOfCast} title="Rest of the cast" />
          <List array={crew} title="Crew" />
        </>
      )}
    </div>
  );
}

type ListProps = {
  array: CastMember[] | CrewMember[];
  title: string;
};
function List({ array, title }: ListProps) {
  if (array.length === 0) return;

  return (
    <details>
      <summary className="px-2 py-2 cursor-pointer hover:bg-gray-900 hover:text-primary">
        {title} - click here to expand{" "}
      </summary>
      <p className="px-2">
        {array.map((item, index) => (
          <span key={index}>
            {item.name}
            <span className="text-emerald-200">
              {" - "}
              {"character" in item ? item.character : item.job}
            </span>
            {array.length - 1 !== index && ", "}
          </span>
        ))}
      </p>
    </details>
  );
}

function Hr() {
  return <hr className="border-dashed opacity-30 mx-2 my-6" />;
}
