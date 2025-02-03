import Carousel from "@/components/carousels/aspect-poster/carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/carousels/slider/silder";
import { Metadata } from "next";
import { Suspense } from "react";
import { today, nextMonth, halfYearAgo, yearsAgo } from "@/lib/utils";

import SliderSkeleton from "@/components/skeletons/slider-skeleton";
import { SectionPropsDiscover } from "@/lib/definitions";
import Section from "@/components/item-section";

export const metadata: Metadata = {
  title: "Movies",
};

export default function Movies() {
  const SECTION: SectionPropsDiscover<"movie">[] = [
    {
      title: "Top Rated",
      icon: "StarIcon",
      component: Slider,
      query: { sort_by: "vote_average.desc" },
      type: "movie",
    },
    {
      title: "Upcoming",
      component: Carousel,
      query: {
        sort_by: "popularity.desc",
        with_release_type: "2|3",
        "primary_release_date.gte": today,
        "primary_release_date.lte": nextMonth,
        "vote_count.gte": 0,
      },
      type: "movie",
    },
    {
      title: "Recently Released",
      component: Carousel,
      query: {
        sort_by: "primary_release_date.desc",
        with_release_type: "2|3",
        "primary_release_date.gte": halfYearAgo,
        "primary_release_date.lte": today,
        "vote_count.gte": 200,
      },
      type: "movie",
    },
    {
      title: "Most Popular",
      icon: "ArrowTrendingUpIcon",
      component: Carousel,
      query: { sort_by: "popularity.desc" },
      numbers: true,
      type: "movie",
    },
    {
      title: "Top rated old movies",
      component: Carousel,
      query: {
        sort_by: "vote_average.desc",
        "primary_release_date.lte": yearsAgo(15),
        "vote_count.gte": 2000,
      },
      type: "movie",
    },
  ];

  return SECTION.map(({ title, icon, component, numbers, query, type }) => (
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
        type={type}
      />
    </Suspense>
  ));
}
