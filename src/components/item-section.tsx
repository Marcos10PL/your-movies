import { fetchDiscover, fetchTrending } from "@/api/actions";
import { SearchOptions } from "@/lib/definitions";
import { IconType } from "./carousels/title";
import Error from "./error";

type SectionPropsCommon = {
  title: string;
  icon?: IconType;
  component: React.ElementType;
  numbers?: true;
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
}: SectionProps) {
  let data = null;

  if (time) 
    data = await fetchTrending(type, time);
  else if ((type === "movie" || type === "tv") && query)
    data = await fetchDiscover(type, query);

  return data ? (
    <Component data={data} title={title} icon={icon} numbers={numbers} />
  ) : (
    <Error title={title} />
  );
}
