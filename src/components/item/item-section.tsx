import { fetchData } from "@/api/actions";
import Error from "../error";
import { SearchOptions } from "@/lib/definitions";
import { IconType } from "../carousels/title";

type SectionProps = {
  title: string;
  icon?: IconType;
  component: React.ElementType;
  numbers?: true;
  query: SearchOptions<"movie" | "tv">;
  type: "movie" | "tv";
};

export default async function Section({
  title,
  icon,
  component: Component,
  numbers,
  query,
  type,
}: SectionProps) {
  const data = await fetchData(type, query);

  return data ? (
    <Component data={data} title={title} icon={icon} numbers={numbers} />
  ) : (
    <Error title={title} />
  );
}
