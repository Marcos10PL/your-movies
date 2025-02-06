import { fetchDiscover, fetchTrending } from "@/api/actions";
import { SearchOptions } from "@/lib/definitions";
import { IconType } from "./carousels/title";
import Error from "./error";

type SectionPropsCommon = {
  title: string;
  icon?: IconType;
  component: React.ElementType;
  numbers?: true;
  query?: SearchOptions<"movie" | "tv">;
  moreLink?: true;
  href?: string;
};

type SectionPropsDiscover = SectionPropsCommon & {
  type: "movie" | "tv";
  query: SearchOptions<"movie" | "tv">;
  time?: never;
};

type SectionPropsTrending = SectionPropsCommon & {
  type: "movie" | "tv" | "all";
  time: "day" | "week";
  query?: never;
};

export type SectionProps = SectionPropsDiscover | SectionPropsTrending;

export default async function Section({
  title,
  icon,
  component: Component,
  numbers,
  query,
  type,
  time,
  moreLink,
  href
}: SectionProps) {
  let data = null;
  let results = null;

  if (time) data = await fetchTrending(type, time);
  else if ((type === "movie" || type === "tv") && query)
    data = await fetchDiscover(type, query);

  if (data) results = data.results;
  
  return data ? (
    <Component
      data={results}
      title={title}
      icon={icon}
      numbers={numbers}
      moreLink={moreLink}
      href={href}
    />
  ) : (
    <Error title={title} />
  );
}
