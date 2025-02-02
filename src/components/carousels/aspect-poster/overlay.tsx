import clsx from "clsx";
import Stars from "@/components/stars";
import AvgRating from "@/components/avg-rating";
import { CarouselItem } from "@/lib/definitions";

type OverlayProps = {
  item: CarouselItem;
  numbers?: true;
  overlayAlwaysVisible?: true;
  noLink?: true;
};

export default function Overlay({
  item,
  numbers,
  overlayAlwaysVisible,
  noLink,
}: OverlayProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 text-lg",
        overlayAlwaysVisible
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100 duration-500",
        overlayAlwaysVisible && !noLink && "group-hover:text-primary"
      )}
    >
      <div className="relative w-full h-full">
        <div className="*:w-full *:absolute *:text-center *px-1">
          <div
            className={clsx(
              "top-0 bg-gradient-to-b from-black to-transparent pb-5",
              numbers && "max-w-[calc(100%-2.5rem)] right-0"
            )}
          >
            {item.topOverlayMessage}
          </div>
          <div className="bottom-0 bg-gradient-to-t from-black to-transparent pt-20 pb-1">
            {item.bottomOverlayMessage === "RATING" ? (
              <div>
                <AvgRating voteAvg={item.voteAverage} />
                <Stars voteAvg={item.voteAverage} responsive={false} />
              </div>
            ) : (
              item.bottomOverlayMessage
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
