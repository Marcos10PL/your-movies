import { fetchMovies } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Movie } from "@/lib/definitions";

export default async function TenMostPopular() {
  const movies: Movie[] = await fetchMovies('upcoming');

  return (
    <div>
      <Carousel data={movies} title="Upcoming"/>
    </div>
  );
}
