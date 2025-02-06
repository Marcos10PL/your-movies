import Carousel from "@/components/carousels/aspect-poster/carousel";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";
import Section from "@/components/item-section";
import { SERIES } from "@/lib/variables";

export const metadata: Metadata = {
  title: "TV Series",
};

export default function Series() {
  return SERIES.map(({ title, icon, component, numbers, query, type }) => (
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
        moreLink
      />
    </Suspense>
  ));
}
