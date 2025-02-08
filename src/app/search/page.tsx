import { fetchMulti } from "@/api/actions";
import Pagination from "@/components/carousels/search-page/pagination";
import SearchPage from "@/components/carousels/search-page/search-page";
import { movieAndSeriesArray } from "@/lib/utils";

type SearchProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function Search({ searchParams }: SearchProps) {
  const params = await searchParams;
  const query = params.query;
  const page = parseInt(params.page ?? "1", 10);

  if (!query) return <div>No results found.</div>;

  const data = await fetchMulti(query, { page });
  if (!data) return <div>No results found.</div>;

  const results = data.results;
  if (!results) return <div>No results found.</div>;

  const resultsFiltered = movieAndSeriesArray(results);
  if (resultsFiltered.length === 0) return <div>No results found.</div>;

  return (
    <>
      <SearchPage data={resultsFiltered} title={`Searches for "${query}":`} />
      <Pagination
        href={`/search/?query=${query}`}
        currentPage={page}
        totalPages={data.total_pages}
      />
    </>
  );
}
