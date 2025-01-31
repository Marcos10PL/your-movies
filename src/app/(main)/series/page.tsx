import { fetchData } from "@/api/actions";
import Carousel from "@/components/carousels/aspect-poster/carousel";
import Error from "@/components/error";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/slider/silder";
import { today } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TV Series",
};

export default async function Series() {
  const dataMap = {
    topRated: await fetchData("tv", { sort_by: "vote_average.desc" }),
    airingToday: await fetchData("tv", {
      sort_by: "popularity.desc",
      "air_date.gte": today,
      "air_date.lte": today,
      "vote_count.gte": 150,
    }),
    onTheAir: await fetchData("tv", {
      sort_by: "popularity.desc",
      "air_date.gte": today,
    }),
    popular: await fetchData("tv", { sort_by: "popularity.desc" }),
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
    { key: "airingToday", title: "Airing Today", component: Carousel },
    { key: "onTheAir", title: "On The Air", component: Carousel },
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
          <div key={key} className="py-2">
            {data ? (
              <Suspense fallback={<CarouselSkeleton title={title} />}>
                <Component
                  data={data}
                  title={title}
                  {...(popular && { popular })}
                />
              </Suspense>
            ) : (
              <Error title={title} />
            )}
          </div>
        );
      })}
    </div>
  );
}
