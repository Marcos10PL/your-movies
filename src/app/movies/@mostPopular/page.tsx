import { fetchMovies } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Movie } from "@/lib/definitions";

export default async function TenMostPopular() {
  const movies: Movie[] = await fetchMovies('popular');

  return (
    <div>
      <Carousel data={movies} title="Top 10 now" top10 />
    </div>
  );
}
