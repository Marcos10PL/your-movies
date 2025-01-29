import clsx from "clsx";
import { Item } from "./carousel";
import Stars from "@/components/stars";
import AvgRating from "@/components/avg-rating";

type OverlayProps = {
  item: Item;
  popular?: true;
  overlayAlwaysVisible?: true;
};

export default function Overlay({
  item,
  popular,
  overlayAlwaysVisible,
}: OverlayProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 text-lg",
        overlayAlwaysVisible
          ? "opacity-100"
          : "md:opacity-0 group-hover:opacity-100 duration-500"
      )}
    >
      <div className="relative w-full h-full">
        <div className="*:w-full *:absolute *:text-center">
          <div
            className={clsx(
              "top-0 bg-gradient-to-b from-black to-transparent pb-5",
              popular && "max-w-[calc(100%-2.5rem)] right-0"
            )}
          >
            <TopDescription item={item} />
          </div>
          <div className="bottom-0 bg-gradient-to-t from-black to-transparent pt-20 pb-1 px-2">
            <BottomDescription item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopDescription({ item }: { item: Item }) {
  if ("episode_count" in item)
    return (
      <span className="group-hover:text-primary">
        {item.name} ({new Date(item.air_date).getFullYear()})
      </span>
    );

  if ("character" in item)
    return <span>{item.name ? item.name : "Uknown name"}</span>;

  if ("first_air_date" in item && item.first_air_date)
    return <span>{item.first_air_date}</span>;

  if ("release_date" in item && item.release_date)
    return <span>{item.release_date}</span>;

  return <span>Uknown date</span>;
}

function BottomDescription({ item }: { item: Item }) {
  if ("episode_count" in item)
    return (
      <span className="group-hover:text-primary">
        {item.episode_count} episodes
      </span>
    );

  if ("vote_count" in item)
    return item.vote_count ? (
      <div>
        <AvgRating voteAvg={item.vote_average} />
        <Stars voteAvg={item.vote_average} responsive={false} />
      </div>
    ) : (
      <span>No ratings yet</span>
    );

  if ("character" in item)
    return (
      <span className="text-emerald-200">
        {item.character ? item.character : "Uknown character"}
      </span>
    );
}
