import CookiesSwitch from "@/components/cookies/cookies-switch";
import useLocalStorage from "@/components/my-hooks/useLocalStorage";
import { LS_KEYS } from "@/lib/variables";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type VideoProps = {
  videoKey: string;
  site: string;
};

export default function VideoItem({ videoKey }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCookiesSet, _] = useLocalStorage(LS_KEYS.cookiesAccepted, false); //eslint-disable-line

  return (
    <div
      className={clsx(
        "relative min-w-[calc(100%-1rem)] lg:min-w-[calc(50%-1rem)] xl:min-w-[calc(33.33%-1rem)] xxl:min-w-[calc(25%-1rem)] mx-2 aspect-video rounded-lg border-2 border-slate-700 overflow-hidden",
        isCookiesSet ? "pointer-events-auto  cursor-pointer" : "cursor-default"
      )}
      onClick={() => setIsPlaying(true)}
    >
      {isCookiesSet ? (
        isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              fill
              blurDataURL="/img/blur.png"
              placeholder="blur"
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
        )
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-full">
          <p className="px-5">To watch this video you must enable cookies</p>
          <CookiesSwitch />
        </div>
      )}
    </div>
  );
}
