import Carousel from "@/components/carousels/aspect-poster/carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/carousels/slider/silder";
import { Metadata } from "next";
import { Suspense } from "react";
import { today } from "@/lib/utils";
import Section from "@/components/item/item-section";
import { SECTIONSProps } from "@/lib/definitions";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";

export const metadata: Metadata = {
  title: "TV Series",
};

export default function Series() {
  const SECTIONS: SECTIONSProps<"tv">[] = [
    {
      title: "Top Rated",
      icon: "StarIcon",
      component: Slider,
      query: { sort_by: "vote_average.desc" },
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
    },
    {
      title: "On The Air",
      component: Carousel,
      query: { sort_by: "popularity.desc", "air_date.gte": today },
    },
    {
      title: "Most Popular",
      icon: "ArrowTrendingUpIcon",
      component: Carousel,
      query: { sort_by: "popularity.desc" },
      numbers: true,
    },
  ];

  return SECTIONS.map(({ title, icon, component, numbers, query }) => (
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
        type="tv"
      />
    </Suspense>
  ));
}
