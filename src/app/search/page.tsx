import { fetchMulti } from "@/api/actions";
import Pagination from "@/components/carousels/search-page/pagination";
import SearchPage from "@/components/carousels/search-page/search-page";
import { movieAndSeriesArray } from "@/lib/utils";

type SearchProps = {
  searchParams: Promise<{ query?: string; page?: number }>;
};

export default async function Search({ searchParams }: SearchProps) {
  const params = await searchParams;
  const query = params.query;
  const page = Number(params.page);

  if (!query) return <div className="px-2">Invalid query.</div>;

  const data = await fetchMulti(query, { page });
  if (!data) return <div className="px-2"> Sorry, something went wrong.</div>;

  const results = data.results;
  const resultsFiltered = movieAndSeriesArray(results);
  if (resultsFiltered.length === 0)
    return <div className="px-2">No results found.</div>;

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
