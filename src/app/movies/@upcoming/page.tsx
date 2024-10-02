import { fetchUpcomingMovies } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Movie } from "@/lib/definitions";

export default async function TenMostPopular() {
  const movies: Movie[] = await fetchUpcomingMovies();

  return (
    <div>
      <Carousel data={movies} title="Upcoming"/>
    </div>
  );
}
