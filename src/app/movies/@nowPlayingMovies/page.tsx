import { fetchNowPlayingMovies } from "@/api/actions";
import Carousel from "@/components/carousel";

export default async function Movies() {
  const movies = await fetchNowPlayingMovies();

  return (
    <div>
      <Carousel data={movies} title="Now Playing Movies" />
    </div>
  );
}
