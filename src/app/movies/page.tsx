import { fetchMovies } from "@/api/actions";
import AsyncCarouselFull from "@/components/carousel-full/async-carousel-full";
import AsyncCarousel from "@/components/carousel/async-carousel";
import { Suspense } from "react";

export default async function Movies() {
  const upcoming = fetchMovies("upcoming");
  const popular = fetchMovies("popular");
  const nowPlaying = fetchMovies("now_playing");

  return (
    <>
      <Suspense fallback={<div>Loading best rated...</div>}>
        <AsyncCarouselFull promise={popular} />
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
