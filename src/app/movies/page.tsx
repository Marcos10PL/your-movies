import { fetchData } from "@/api/actions";
import AsyncCarousel from "@/components/carousel/async-carousel";
import { halfYearAgo, nextMonth, today } from "@/lib/utils";
import { Suspense } from "react";

export default async function Movies() {
  const topRated = fetchData("movie", { sort_by: "vote_average.desc" });
  const popular = fetchData("movie", { sort_by: "popularity.desc" });

  const upcoming = fetchData("movie", {
    sort_by: "popularity.desc",
    with_release_type: "2|3",
    "primary_release_date.gte": today,
    "primary_release_date.lte": nextMonth,
    "vote_count.gte": 0,
  });

  const recentlyReleased = fetchData("movie", {
    sort_by: "primary_release_date.desc",
    with_release_type: "2|3",
    "primary_release_date.gte": halfYearAgo,
    "primary_release_date.lte": today,
    "vote_count.gte": 200,
  });

  return (
    <>
      <Suspense fallback={<div>Loading best rated...</div>}>
        <AsyncCarousel promise={topRated} title="Top rated" topRated />
      </Suspense>

      <Suspense fallback={<div>Loading upcoming movies...</div>}>
        <AsyncCarousel promise={upcoming} title="Upcoming" />
      </Suspense>

      <Suspense fallback={<div>Loading recently released...</div>}>
        <AsyncCarousel promise={recentlyReleased} title="Recently released" />
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

// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}
