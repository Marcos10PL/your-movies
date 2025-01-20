import { fetchData } from "@/api/actions";
import { today } from "@/lib/utils";
import { Suspense } from "react";

export default async function Series() {
  const popular = fetchData("tv", { sort_by: "popularity.desc" });
  const topRated = fetchData("tv", { sort_by: "vote_average.desc" });

  const airingToday = fetchData("tv", {
    sort_by: "popularity.desc",
    "air_date.gte": today,
    "air_date.lte": today,
    "vote_count.gte": 150,
  });

  const onTheAir = fetchData("tv", {
    sort_by: "popularity.desc",
    "air_date.gte": today,
  });

  return (
    <>
      {/* <Suspense fallback={<div>Loading top rated</div>}>
        <AsyncCarousel promise={topRated} title="Top rated" topRated />
      </Suspense>
      <Suspense fallback={<div>Loading airing today...</div>}>
        <AsyncCarousel promise={airingToday} title="Airing today" />
      </Suspense>
      <Suspense fallback={<div>Loading on the air..</div>}>
        <AsyncCarousel promise={onTheAir} title="On the air" />
      </Suspense>
      <Suspense fallback={<div>Loading popular...</div>}>
        <AsyncCarousel promise={popular} title="Most popular" mostPopular />
      </Suspense> */}
    </>
  );
}
