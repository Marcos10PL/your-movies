import Carousel from "@/components/carousels/aspect-poster/carousel";
import Slider from "@/components/carousels/slider/silder";
import Section from "@/components/item/item-section";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";
import { SECTIONSProps } from "@/lib/definitions";
import { today, weekAgo, yearAgo } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home() {
  const SECTIONS: SECTIONSProps<"movie">[] = [
    {
      title: "Top rated movies from last year",
      component: Carousel,
      query: {},
    }
    
    // {
    //   title: "Upcoming",
    //   component: Carousel,
    //   query: {
    //     sort_by: "popularity.desc",
    //     with_release_type: "2|3",
    //     "primary_release_date.gte": today,
    //     "primary_release_date.lte": nextMonth,
    //     "vote_count.gte": 0,
    //   },
    // },
    // {
    //   title: "Recently Released",
    //   component: Carousel,
    //   query: {
    //     sort_by: "primary_release_date.desc",
    //     with_release_type: "2|3",
    //     "primary_release_date.gte": halfYearAgo,
    //     "primary_release_date.lte": today,
    //     "vote_count.gte": 200,
    //   },
    // },
    // {
    //   title: "Most Popular",
    //   icon: "ArrowTrendingUpIcon",
    //   component: Carousel,
    //   query: { sort_by: "popularity.desc" },
    //   numbers: true,
    // },
  ];

  return (
    <div className="text-lg md:text-xl xl:text-2xl *:py-2 md:*:py-3">
      {SECTIONS.map(({ title, icon, component, numbers, query }) => (
        <Suspense
          key={title}
          fallback={
            component === Carousel ? (
              <CarouselSkeleton title={title} />
            ) : (
              <SliderSkeleton title={title} />
            )
          }
        >
          <Section
            title={title}
            icon={icon}
            component={component}
            numbers={numbers}
            query={query}
            type="movie"
          />
        </Suspense>
      ))}
    </div>
  );
}
