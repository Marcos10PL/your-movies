import { fetchDiscover, fetchMulti } from "@/api/actions";
import Pagination from "@/components/carousels/search-page/pagination";
import SearchPage from "@/components/carousels/search-page/search-page";
import { MOVIES, SERIES } from "@/lib/variables";

type SearchProps = {
  searchParams: Promise<{
    title: string;
    type: "movie" | "tv";
    page: string;
  }>;
};

export default async function Search({ searchParams }: SearchProps) {
  const params = await searchParams;
  const type = params.type;
  const title = params.title;
  const page = parseInt(params.page, 10);

  let item = null;
  if (type === "movie") {
    item = MOVIES.find(item => item.title === title);
  } else {
    item = SERIES.find(item => item.title === title);
  }

  if (!item) return <div>Sorry, something went wrong.</div>;

  const data = await fetchDiscover(type, { ...item.query, page });
  const results = data?.results;

  if (!results || !data) return <div>Sorry, something went wrong.</div>;

  if (results.length === 0) return <div>No results found.</div>;

  return (
    <>
      <SearchPage data={results} title={`${title}:`} />
      <Pagination
        href={`/more/?title=${title}&type=${type}`}
        currentPage={page}
        totalPages={data.total_pages}
      />
    </>
  );
}
