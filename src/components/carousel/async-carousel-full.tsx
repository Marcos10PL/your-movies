import { Movie } from "@/lib/definitions";
import CarouselFull from "./carosuel-full";

type AsyncCarouselProps = {
  promise: Promise<Movie[]>;
  title: string
};

export default async function AsyncCarouselFull({
  promise, title
}: AsyncCarouselProps) {
  const data = await promise;
  return <CarouselFull data={data} title={title} />;
}
