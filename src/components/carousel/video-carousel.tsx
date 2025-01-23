"use client";

import type { Video } from "@/lib/definitions";
import { useRef } from "react";
import { scrollFunction } from "./carousel";
import Button from "./button";

type VideoCarouselProps = {
  videos: Video[];
};

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-3">
      <div className="relative">
        <div
          className="flex overflow-x-auto gap-3 scrollbar-none"
          ref={carouselRef}
        >
          {videos.map(video => (
            <Video key={video.key} videoKey={video.key} site={video.site} />
          ))}
        </div>

        <Button position="left" onClick={() => scroll(-1)} />
        <Button position="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}

type VideoProps = {
  videoKey: string;
  site: string;
};

function Video({ videoKey, site }: VideoProps) {
  const videoUrl =
    site === "YouTube"
      ? `https://www.youtube-nocookie.com/embed/${videoKey}`
      : null;

  if (!videoUrl) return <p>Video not supported</p>;

  return (
    <iframe
      className="aspect-video"
      src={videoUrl}
      allow="accelerometer; autoply; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
}
