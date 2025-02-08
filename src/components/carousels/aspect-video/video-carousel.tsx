"use client";

import Button from "../button";
import type { Video } from "@/lib/definitions";
import VideoItem from "./video";
import Title from "../title";
import useCarouselButtons from "@/components/my-hooks/useCarouselBattons";

type VideoCarouselProps = {
  videos: Video[];
  title: string;
};

export default function VideoCarousel({ videos, title }: VideoCarouselProps) {
  const { carouselRef, canScrollLeft, canScrollRight, scroll } = useCarouselButtons();
  
  if (videos.length === 0) return null;

  return (
    <div>
      <Title title={title} />

      <div className="relative pt-2">
        <div className="flex overflow-x-auto scrollbar-none" ref={carouselRef}>
          {videos.map(video => (
            <VideoItem key={video.key} videoKey={video.key} site={video.site} />
          ))}
        </div>

        {canScrollLeft && <Button position="left" onClick={() => scroll(-1)} />}
        {canScrollRight && (
          <Button position="right" onClick={() => scroll(1)} />
        )}
      </div>
    </div>
  );
}
