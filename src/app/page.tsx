import Carousel from "@/components/carousels/aspect-poster/carousel";
import Slider from "@/components/carousels/slider/silder";
import Section from "@/components/item-section";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import SliderSkeleton from "@/components/skeletons/slider-skeleton";
import { SectionPropsDiscover, SectionPropsTrending } from "@/lib/definitions";
import { Suspense } from "react";

export default async function Home() {
  const trendingAll: SectionPropsTrending = {
    title: "Trending this week -  TV Series and Movies",
    component: Carousel,
    time: "week",
    type: "all",
  };

  const discoverMovie: SectionPropsDiscover<"movie"> = {
    title: "Discover movies",
    component: Slider,
    type: "movie",
    query: { sort_by: "popularity.desc", page: 2 },
  };

  const discoverTv: SectionPropsDiscover<"tv"> = {
    title: "Discover series",
    component: Slider,
    type: "tv",
    query: { sort_by: "popularity.desc", page: 2 },
  };

  const trendingMovie: SectionPropsTrending = {
    title: "Trending today - Movies",
    component: Carousel,
    type: "movie",
    time: "day",
  };

  const trendingTv: SectionPropsTrending = {
    title: "Trending today - TV Series",
    component: Carousel,
    type: "tv",
    time: "day",
  };

  return (
    <>
      {/* trending all */}
      <Suspense fallback={<CarouselSkeleton title={trendingAll.title} />}>
        <Section {...trendingAll} />
      </Suspense>

      {/* discover movies */}
      <Suspense fallback={<SliderSkeleton title={discoverMovie.title} />}>
        <Section {...discoverMovie} moreLink href="/movies"/>
      </Suspense>

      {/* trending today movies*/}
      <Suspense fallback={<CarouselSkeleton title={trendingMovie.title} />}>
        <Section {...trendingMovie} />
      </Suspense>

      {/* discover series */}
      <Suspense fallback={<SliderSkeleton title={discoverTv.title} />}>
        <Section {...discoverTv} moreLink href="/series" />
      </Suspense>

      {/* trending today series */}
      <Suspense fallback={<CarouselSkeleton title={trendingTv.title} />}>
        <Section {...trendingTv} />
      </Suspense>
    </>
  );
}
