import Image from "next/image";
import { useState } from "react";

type VideoProps = {
  videoKey: string;
  site: string;
};

export default function VideoItem({ videoKey, site }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl =
    site === "YouTube"
      ? `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`
      : null;

  if (!thumbnailUrl) return <p>Video not supported</p>;

  return (
    <div
      className="relative min-w-[calc(100%-1rem)] lg:min-w-[calc(50%-1rem)] xl:min-w-[calc(33.33%-1rem)] xxl:min-w-[calc(25%-1rem)] mx-2 aspect-video rounded-lg border-2 border-slate-700 cursor-pointer overflow-hidden"
      onClick={() => setIsPlaying(true)}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="64px"
              height="64px"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
