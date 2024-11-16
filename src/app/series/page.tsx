import { fetchTvSeries } from "@/api/actions";
import AsyncCarousel from "@/components/carousel/async-carousel";
import { Suspense } from "react";

export default async function Series() {
  const airingToday = fetchTvSeries("airing_today");

  return (
    <>
      <Suspense fallback={<div>Loading best rated...</div>}>
        <AsyncCarousel promise={airingToday} title="Airing today" />
      </Suspense>
    </>
  );
}
