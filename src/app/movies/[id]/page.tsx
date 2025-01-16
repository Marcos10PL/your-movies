import { findById } from "@/api/actions";
import AvgRating from "@/components/avg-rating";
import Layout from "@/components/item-details/layout";
import Stars from "@/components/stars";
import type { Movie } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Movies",
};

type MovieProps = {
  params: {
    id: string;
  };
};

export default async function Movie({ params }: MovieProps) {
  const { id } = await params;
  const movie: Movie = await findById("movie", parseInt(id, 10));

  if (!movie) {
    notFound();
  }

  return (
    <Layout>
      <div className="relative flex items-center justify-center">
        <div className="absolute top-0 w-full z-0">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full opacity-50 rounded-xl"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r md:from-gray-950 from-slate-950 to-transparent " />
          <div className="absolute inset-0 bg-gradient-to-t md:from-black from-slate-950 to-transparent" />
        </div>

        <div className="z-20 px-2 text-xl *:pt-2 *:pb-2">
          <h1 className="text-3xl text-primary">{movie.title}</h1>
          <p className="md:w-2/3 xl:w-1/2">{movie.overview}</p>
          <p className="py-4">{movie.release_date}</p>
          {movie.vote_average ? (
            <div className="*:flex *:py-1">
              <div>
                <AvgRating voteAvg={movie.vote_average} />
              </div>
              <div>
                <Stars voteAvg={movie.vote_average} responsive={false} />
              </div>
              {movie.vote_count} votes
            </div>
          ) : (
            "No ratings"
          )}
        </div>
      </div>
    </Layout>
  );
}
