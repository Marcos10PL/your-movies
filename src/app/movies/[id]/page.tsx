import { fetchCast, findById } from "@/api/actions";
import AvgRating from "@/components/avg-rating";
import AsyncCarousel from "@/components/carousel/people/async-carousel";
import { Backdrop } from "@/components/item-details/backdrop";
import { Details } from "@/components/item-details/details";
import Director from "@/components/item-details/director";
import Layout from "@/components/item-details/layout";
import Stars from "@/components/stars";
import type { Credits, CrewMember, Movie } from "@/lib/definitions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  if (!movie) notFound();

  const credits = fetchCast("movie", parseInt(id, 10));

  return (
    <Layout>
      <Backdrop title={movie.title} backdropPath={movie.backdrop_path} />
      <div className="z-30 px-2 pt-48 md:pt-0">
        <Details item={movie}>
          <Suspense>
            <Director promise={credits} />
          </Suspense>
        </Details>
      </div>
      <div className="z-30">
        <Suspense fallback={<div>Loading cast...</div>}>
          <AsyncCarousel promise={credits} title="Cast" />
        </Suspense>
      </div>
    </Layout>
  );
}
