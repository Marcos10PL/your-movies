import { Movie, TvSeries } from "@/lib/definitions";
import Carousel from "./carousel";
import { IconType } from "../title";

export type AsyncCarouselProps = {
  promise: Movie[] | TvSeries[];
  title: string;
  icon?: IconType;
} & (
  | { topRated: true; mostPopular?: false }
  | { mostPopular: true; topRated?: false }
  | { topRated?: false; mostPopular?: false }
);

export default async function AsyncCarousel({
  promise,
  title,
  mostPopular,
  icon,
  topRated,
}: AsyncCarouselProps) {
  const data = promise;

  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <Carousel
      data={data}
      title={title}
      icon={icon}
      topRated={topRated}
      mostPopular={mostPopular}
    />
  );
}
