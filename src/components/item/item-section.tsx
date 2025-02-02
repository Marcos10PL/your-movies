import { fetchData } from "@/api/actions";
import Error from "../error";
import { SearchOptions } from "@/lib/definitions";

type SectionProps = {
  title: string;
  component: React.ElementType;
  popular?: true;
  query: SearchOptions<"movie" | "tv">;
  type: "movie" | "tv";
};

export default async function Section({
  title,
  component: Component,
  popular,
  query,
  type,
}: SectionProps) {
  const data = await fetchData(type, query);
 
  return data ? (
    <Component data={data} title={title} {...(popular && { popular })} />
  ) : (
    <Error title={title} />
  );
}
