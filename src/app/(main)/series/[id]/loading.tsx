import Hr from "@/components/hr";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import ItemDetailsSkeleton from "@/components/skeletons/item-details-skeleton";
import VideoCarouselSkeleton from "@/components/skeletons/video-carousel-skeleton";

export default function Loading() {
  return (
    <>
      <ItemDetailsSkeleton />
      <Hr />
      <CarouselSkeleton />
      <Hr />
      <VideoCarouselSkeleton />
      <Hr />
      <CarouselSkeleton />
    </>
  );
}
