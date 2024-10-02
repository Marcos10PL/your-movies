import { fetchNowPlayingMovies } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import { Movie } from "@/lib/definitions";

export default async function Movies() {
  const movies: Movie[] = await fetchNowPlayingMovies();

  return (
    <div>
      <Carousel data={movies} title="Now Playing Movies" />
    </div>
  );
}
