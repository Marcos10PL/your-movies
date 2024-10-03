import { fetchMovies } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Movie } from "@/lib/definitions";

export default async function Movies() {
  const movies: Movie[] = await fetchMovies('now_playing');

  return (
    <div>
      <Carousel data={movies} title="Now Playing Movies" />
    </div>
  );
}
