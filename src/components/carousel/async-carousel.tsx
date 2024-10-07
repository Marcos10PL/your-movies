import { Movie } from "@/lib/definitions";
import Carousel from "./carousel";

type AsyncCarouselProps = {
  promise: Promise<Movie[]>;
  title: string;
  top10?: boolean;
  icon?: string;
  onlyBackdrop?: boolean;
};

export default async function AsyncCarousel({
  promise,
  title,
  top10,
  icon,
  onlyBackdrop
}: AsyncCarouselProps) {
  const data = await promise;
  return <Carousel data={data} title={title} top10={top10} icon={icon} onlyBackdrop={onlyBackdrop}/>;
}
