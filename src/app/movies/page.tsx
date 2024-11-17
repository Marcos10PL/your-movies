import { fetchData } from "@/api/actions";
import AsyncCarousel from "@/components/carousel/async-carousel";
import { Suspense } from "react";

export default async function Movies() {
  const topRated = fetchData("movie", { sort_by: "vote_average.desc" });
  const popular = fetchData("movie", { sort_by: "popularity.desc" });

  const upcoming = fetchData("movie", { sort_by: "popularity.desc" });
  const nowPlaying = fetchData("movie", { sort_by: "popularity.desc" });

  return (
    <>
      <Suspense fallback={<div>Loading best rated...</div>}>
        <AsyncCarousel promise={topRated} title="Top rated" topRated />
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
          icon="ArrowTrendingUpIcon"
          mostPopular
        />
      </Suspense>
    </>
  );
}
