import { Movie } from "@/lib/definitions";
import CarouselFull from "./carosuel-full";

type AsyncCarouselProps = {
  promise: Promise<Movie[]>;
};

export default async function AsyncCarouselFull({
  promise,
}: AsyncCarouselProps) {
  const data = await promise;
  return <CarouselFull data={data} />;
}
