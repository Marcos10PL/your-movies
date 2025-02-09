import Image from "next/image";
import Link from "next/link";

type EpisodeProps = {
  id: number;
  path: string;
  name: string;
  episodeNumber: number;
  overview: string;
  realeaseDate: string;
  seasonNr: number;
};

export default function Episode({
  id,
  path,
  name,
  episodeNumber,
  overview,
  realeaseDate,
  seasonNr,
}: EpisodeProps) {
  return (
    <div
      key={id}
      className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800 mb-4"
    >
      <div className="flex flex-col md:flex-row justify-center border-b-2 border-gray-800">
        <div className="relative w-full aspect-video md:w-1/3 xl:w-1/5">
          {path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${path}/`}
              alt={name}
              fill
              className="object-cover"
              blurDataURL="/img/blur.png"
              placeholder="blur"
            />
          ) : (
            <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-300 group-hover:scale-105 z-50">
              <p className="text-white">No image available</p>
            </div>
          )}
        </div>

        <div className="md:w-2/3 px-3 py-2 xl:w-4/5">
          <h2 className="text-primary">
            {episodeNumber}. {name}
          </h2>
          <p>{overview}</p>
          <div className="hidden">
            <p>Release date: {realeaseDate}</p>
          </div>
        </div>
      </div>

      <Link
        className="p-2 bg-slate-950 hover:bg-gray-900 duration-150 hover:text-primary h-full text-center"
        href={`${seasonNr}/episode/${episodeNumber}`}
      >
        Show more...
      </Link>
    </div>
  );
}
