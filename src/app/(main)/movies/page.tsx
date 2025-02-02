import Carousel from "@/components/carousels/aspect-poster/carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import Slider from "@/components/carousels/slider/silder";
import { Metadata } from "next";
import { Suspense } from "react";
import { today, nextMonth, halfYearAgo } from "@/lib/utils";
import Section from "@/components/item/item-section";
import { SECTIONSProps} from "@/lib/definitions";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";

export const metadata: Metadata = {
  title: "Movies",
};

export default function Movies() {
  const SECTIONS: SECTIONSProps<"movie">[] = [
    {
      title: "Top Rated",
      icon: "StarIcon",
      component: Slider,
      query: { sort_by: "vote_average.desc" },
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
          <CarouselSkeleton title={title}/>
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
  ));
}
