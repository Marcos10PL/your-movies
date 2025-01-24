import { fetchData } from "@/api/actions";
import Carousel from "@/components/carousel/carousel";
import Slider from "@/components/slider/silder";

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
      {topRated ? (
        <Suspense fallback={<div>Loading best rated...</div>}>
          <Slider data={topRated} title={TITLES.topRated} />
        </Suspense>
      ) : (
        <Error title={TITLES.topRated} />
      )}

      {upcoming ? (
        <Suspense fallback={<div>Loading upcoming movies...</div>}>
          <Carousel data={upcoming} title={TITLES.upcoming} />
        </Suspense>
      ) : (
        <Error title={TITLES.upcoming} />
      )}

      {recentlyReleased ? (
        <Suspense fallback={<div>Loading recently released...</div>}>
          <Carousel data={recentlyReleased} title={TITLES.recentlyReleased} />
        </Suspense>
      ) : (
        <Error title={TITLES.recentlyReleased} />
      )}

      {popular ? (
        <Suspense fallback={<div>Loading most popular...</div>}>
          <Carousel data={popular} title={TITLES.popular} popular />
        </Suspense>
      ) : (
        <Error title={TITLES.popular} />
      )}
    </>
  );
}

function Error({ title }: { title: string }) {
  return (
    <div className="px-2 py-2 text-lg">
      {title} movies - loading failed. This is a server error, sorry.
    </div>
  );
}
