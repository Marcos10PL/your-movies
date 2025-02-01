"use client";

import { useEffect, useRef, useState } from "react";
import { scrollFunction } from "../aspect-poster/carousel";
import Button from "../button";
import type { Video } from "@/lib/definitions";
import VideoItem from "./video";
import Title from "../title";

type VideoCarouselProps = {
  videos: Video[];
  title: string;
};

export default function VideoCarousel({ videos, title }: VideoCarouselProps) {
  // if (videos.length === 0) return null;

  const carouselRef = useRef<HTMLDivElement>(null!);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    carouselRef.current.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", handleResize);

    return () => {
      carouselRef.current?.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
