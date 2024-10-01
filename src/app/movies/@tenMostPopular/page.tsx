import { fetchTenMostPopular } from "@/app/api/actions";
import Carousel from "@/components/carousel";
import CarouselBox from "@/components/carousel-box";
import { Movie } from "@/lib/definitions";

export default async function TenMostPopular() {
  const movies: Movie[] = await fetchTenMostPopular();

  return (
    <div>
      <CarouselBox data={movies} title="Top 10" />
      {/* <Carousel data={movies} title="Top 10" /> */}
    </div>
  );
}
