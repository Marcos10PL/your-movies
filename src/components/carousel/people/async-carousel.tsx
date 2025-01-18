import { Credits } from "@/lib/definitions";
import Carousel from "./carousel";

export type AsyncCarouselProps = {
  promise: Promise<Credits>;
  title: "Cast";
};

export default async function AsyncCarousel({
  promise,
  title,
}: AsyncCarouselProps) {
  const { cast } = await promise;

  if (cast.length <= 0)
    return <div className="px-2 pb-2">{title} members not available</div>;

  return <Carousel data={cast} title={title} />;
}
