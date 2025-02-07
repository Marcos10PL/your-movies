import { fetchDiscover } from "@/api/actions";
import Pagination from "@/components/carousels/search-page/pagination";
import SearchPage from "@/components/carousels/search-page/search-page";
import BackLink from "@/components/item/back-link";

type GenresProps = {
  searchParams: Promise<{
    id: string;
    name: string;
    page: string;
  }>;
};

export default async function Genres({ searchParams }: GenresProps) {
  const params = await searchParams;

  const name = params.name;
  const id = params.id;
  const page = parseInt(params.page, 10);

  const data = await fetchDiscover("movie", {
    page,
    with_genres: id,
  });

  const results = data?.results;
  if (!results || !data) return <div>Sorry, something went wrong.</div>;

  if (results.length === 0) return <div>No results found.</div>;

  return (
    <div className="space-y-4">
      <BackLink href="/movies" content="Back to Movies" />
      <SearchPage data={results} title={`${name}:`} />
      <Pagination
        href={`/movies/genres?id=${id}&name=${name}`}
        currentPage={page}
        totalPages={data.total_pages}
      />
    </div>
  );
}
