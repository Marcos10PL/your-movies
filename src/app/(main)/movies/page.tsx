import { fetchData } from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import Error from "@/components/error";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/slider/silder";

import { today, nextMonth, halfYearAgo } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Movies",
};

export default async function Movies() {
  const dataMap = {
    topRated: await fetchData("movie", { sort_by: "vote_average.desc" }),
    upcoming: await fetchData("movie", {
      sort_by: "popularity.desc",
      with_release_type: "2|3",
      "primary_release_date.gte": today,
      "primary_release_date.lte": nextMonth,
      "vote_count.gte": 0,
    }),
    recentlyReleased: await fetchData("movie", {
      sort_by: "primary_release_date.desc",
      with_release_type: "2|3",
      "primary_release_date.gte": halfYearAgo,
      "primary_release_date.lte": today,
      "vote_count.gte": 200,
    }),
    popular: await fetchData("movie", { sort_by: "popularity.desc" }),
  };

  type DataKeys = keyof typeof dataMap;

  type SectionsProp = {
    key: DataKeys;
    title: string;
    component: React.ElementType;
    popular?: true;
  };

  const SECTIONS: SectionsProp[] = [
    { key: "topRated", title: "Top Rated", component: Slider },
    { key: "upcoming", title: "Upcoming", component: Carousel },
    {
      key: "recentlyReleased",
      title: "Recently Released",
      component: Carousel,
    },
    {
      key: "popular",
      title: "Most Popular",
      component: Carousel,
      popular: true,
    },
  ];

  return (
    <div className="text-lg md:text-xl xl:text-2xl py-2">
      {SECTIONS.map(({ key, title, component: Component, popular }) => {
        const data = dataMap[key];

        return (
          <div className="py-2" key={key}>
            {data ? (
              <Suspense key={key} fallback={<CarouselSkeleton title={title} />}>
                <Component
                  data={data}
                  title={title}
                  {...(popular && { popular })}
                />
              </Suspense>
            ) : (
              <Error key={key} title={title} />
            )}
          </div>
        );
      })}
    </div>
  );
}
