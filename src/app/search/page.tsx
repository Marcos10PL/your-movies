import { fetchMulti } from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import { notFound } from "next/navigation";

type SearchProps = {
  searchParams: { q?: string };
};

export default async function Search({ searchParams }: SearchProps) {
  const search = (await searchParams).q;

  if (!search) notFound();

  const data = await fetchMulti(search);
  if (!data) notFound();

  let results = null;
  if(data)
    results = data.results;

  console.log(results);


  return (
    <div>
      {/* <Carousel data={results} title="xd" /> */}
      <h1>Search</h1>
    </div>
  );
}