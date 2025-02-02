import Hr from "@/components/hr";
import EpisodesSkeleton from "@/components/skeletons/episodes-skeleton";
import ItemSmallDetailSkeleton from "@/components/skeletons/item-small-details-skeleton";
import VideoCarouselSkeleton from "@/components/skeletons/video-carousel-skeleton";

export default function Loading() {
  return (
    <>
      <ItemSmallDetailSkeleton />
      <Hr />
      <VideoCarouselSkeleton />
      <Hr />
      <EpisodesSkeleton />
    </>
  );
}
