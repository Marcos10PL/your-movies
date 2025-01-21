import { fetchData } from "@/api/actions";
import Carousel from "@/components/carousel/movie-or-tv/carousel";
import Popular from "@/components/carousel/movie-or-tv/popular/popular";
import TopRated from "@/components/carousel/movie-or-tv/top-rated/top-rated";

import { today, nextMonth, halfYearAgo } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Movies",
};

export default async function Movies() {
  const topRated = await fetchData("movie", { sort_by: "vote_average.desc" });
  const popular = await fetchData("movie", { sort_by: "popularity.desc" });

  const upcoming = await fetchData("movie", {
    sort_by: "popularity.desc",
    with_release_type: "2|3",
    "primary_release_date.gte": today,
    "primary_release_date.lte": nextMonth,
    "vote_count.gte": 0,
  });

  const recentlyReleased = await fetchData("movie", {
    sort_by: "primary_release_date.desc",
    with_release_type: "2|3",
    "primary_release_date.gte": halfYearAgo,
    "primary_release_date.lte": today,
    "vote_count.gte": 200,
  });

  const TITLES = {
    topRated: "Top Rated",
    upcoming: "Upcoming",
    recentlyReleased: "Recently Released",
    popular: "Most Popular",
  };

  return (
    <>
      {popular ? (
        <Suspense fallback={<div>Loading most popular...</div>}>
          <Popular data={popular} title={TITLES.popular} />
        </Suspense>
      ) : (
        <Error title={TITLES.popular} />
      )}

      {upcoming ? (
        <Suspense fallback={<div>Loading upcoming movies...</div>}>
          <Carousel data={upcoming} title={TITLES.upcoming} />
        </Suspense>
      ) : (
        <div>Lodaing upcoming </div>
      )}

      {topRated ? (
        <Suspense fallback={<div>Loading best rated...</div>}>
          <TopRated data={topRated} title={TITLES.topRated} />
        </Suspense>
      ) : (
        <Error title={TITLES.topRated} />
      )}

      {recentlyReleased ? (
        <Suspense fallback={<div>Loading recently released...</div>}>
          <Carousel data={recentlyReleased} title={TITLES.recentlyReleased} />
        </Suspense>
      ) : (
        <Error title={TITLES.recentlyReleased} />
      )}
    </>
  );
}

function Error({ title }: { title: string }) {
  return (
    <div>{title} movies - loading failed. This is a server error, sorry.</div>
  );
}
