import { Movie } from "@/lib/definitions";
import Carousel from "./carousel";
import { IconType } from "./title";

export type AsyncCarouselProps = {
  promise: Promise<Movie[]>;
  title: string;
  icon?: IconType;
  topRated?: boolean;
  mostPopular?: boolean;
};

export default async function AsyncCarousel({
  promise,
  title,
  mostPopular,
  icon,
  topRated,
}: AsyncCarouselProps) {
  const data = await promise;

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
