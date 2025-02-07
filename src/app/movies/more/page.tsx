import { fetchDiscover } from "@/api/actions";
import Pagination from "@/components/carousels/search-page/pagination";
import SearchPage from "@/components/carousels/search-page/search-page";
import BackLink from "@/components/item/back-link";
import { MOVIES } from "@/lib/variables";

type SearchProps = {
  searchParams: Promise<{
    title: string;
    page: string;
  }>;
};

export default async function More({ searchParams }: SearchProps) {
  const params = await searchParams;
  const title = params.title;
  const page = parseInt(params.page, 10);

  const item = MOVIES.find(item => item.title === title);
  if (!item) return <div>Sorry, something went wrong.</div>;

  const data = await fetchDiscover("movie", { ...item.query, page });
  const results = data?.results;

  if (!results || !data) return <div>Sorry, something went wrong.</div>;

  if (results.length === 0) return <div>No results found.</div>;

  return (
    <div className="space-y-4">
      <BackLink href="/movies" content="Back to Movies" />
      <SearchPage data={results} title={`${title}:`} />
      <Pagination
        href={`/movies/more/?title=${title}`}
        currentPage={page}
        totalPages={data.total_pages}
      />
    </div>
  );
}
