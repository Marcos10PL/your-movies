import Hr from "@/components/hr";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import ItemDetailsSkeleton from "@/components/skeletons/item-details-skeleton";

export default function Loading() {
  return (
    <>
      <ItemDetailsSkeleton />
      <Hr />
      <CarouselSkeleton />
    </>
  );
}
