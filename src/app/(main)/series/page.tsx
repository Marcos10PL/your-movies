import Carousel from "@/components/carousels/aspect-poster/carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/carousels/slider/silder";
import { Metadata } from "next";
import { Suspense } from "react";
import { today, yearsAgo } from "@/lib/utils";

import { SectionPropsDiscover } from "@/lib/definitions";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";
import Section from "@/components/item-section";

export const metadata: Metadata = {
  title: "TV Series",
};

export default function Series() {
  const SECTION: SectionPropsDiscover<"tv">[] = [
    {
      title: "Top Rated",
      icon: "StarIcon",
      component: Slider,
      query: { sort_by: "vote_average.desc" },
      type: "tv",
    },
    {
      title: "Airing Today",
      component: Carousel,
      query: {
        sort_by: "popularity.desc",
        "air_date.gte": today,
        "air_date.lte": today,
        "vote_count.gte": 50,
      },
      type: "tv",
    },
    {
      title: "On The Air",
      component: Carousel,
      query: { sort_by: "popularity.desc", "air_date.gte": today },
      type: "tv",
    },
    {
      title: "Most Popular",
      icon: "ArrowTrendingUpIcon",
      component: Carousel,
      query: { sort_by: "popularity.desc" },
      numbers: true,
      type: "tv",
    },
    {
      title: "Top rated old series",
      component: Carousel,
      query: {
        sort_by: "vote_average.desc",
        "air_date.lte": yearsAgo(15),
        "vote_count.gte": 2000,
      },
      type: "tv",
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
