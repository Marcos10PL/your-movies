import { fetchMovies } from "@/api/actions";
import AsyncCarousel from "@/components/carousel/async-carousel";
import AsyncCarouselFull from "@/components/carousel/async-carousel-full";
import { Suspense } from "react";

export default async function Movies() {
  const upcoming = fetchMovies("upcoming");
  const popular = fetchMovies("popular");
  const nowPlaying = fetchMovies("now_playing");
  const topRated = fetchMovies("top_rated");

  return (
    <>
      <Suspense fallback={<div>Loading best rated...</div>}>
        <AsyncCarousel promise={topRated} title="Top rated" onlyBackdrop/>
      </Suspense>

      <Suspense fallback={<div>Loading upcoming movies...</div>}>
        <AsyncCarousel promise={upcoming} title="Upcoming" />
      </Suspense>

      <Suspense fallback={<div>Loading now playing...</div>}>
        <AsyncCarousel promise={nowPlaying} title="Now playing" />
      </Suspense>

      <Suspense fallback={<div>Loading most popular...</div>}>
        <AsyncCarousel
          promise={popular}
          title="Most Popular"
          icon={"ArrowTrendingUpIcon"}
          top10
        />
      </Suspense>
    </>
  );
}
