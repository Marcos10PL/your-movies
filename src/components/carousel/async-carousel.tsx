import { Movie } from "@/lib/definitions";
import Carousel from "./carousel";

type AsyncCarouselProps = {
  promise: Promise<Movie[]>;
  title: string;
  top10?: boolean;
  icon?: string;
};

export default async function AsyncCarousel({
  promise,
  title,
  top10,
  icon,
}: AsyncCarouselProps) {
  const data = await promise;
  return <Carousel data={data} title={title} top10={top10} icon={icon} />;
}
