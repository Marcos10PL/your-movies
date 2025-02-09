"use client";

import { Movie, TvSeries } from "@/lib/definitions";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import clsx from "clsx";
import Panel from "./panel";
import AvgRating from "@/components/avg-rating";
import Stars from "@/components/stars";
import Link from "next/link";
import Title, { IconType } from "../title";

type SliderProps = {
  data: TvSeries[] | Movie[];
  title: string;
  icon?: IconType;
  moreLink?: boolean;
  href?: string;
};

export default function Slider({
  data,
  title,
  icon,
  moreLink,
  href: hrefParam,
}: SliderProps) {
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(data[index]);
  const [overflow, setOverflow] = useState(false);
  const [visible, setVisible] = useState(true);
  const divRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const changeAnimationDuration = 7000; // 7s
  const fadeAnimationDuration = 700; // 0.7s

  const isOverflowing = useCallback((element: HTMLElement) => {
    return (
      element.scrollWidth > element.clientWidth ||
      element.scrollHeight > element.clientHeight
    );
  }, []);

  const handleResize = useCallback(() => {
    const div = divRef.current;
    if (div) {
      if (isOverflowing(div)) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    }
  }, [isOverflowing]);

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [item, handleResize]);

  const handleItemChange = useCallback(
    (nextIndex: number) => {
      if (!visible) return;

      if (nextIndex == data.length) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = data.length - 1;
      }

      setVisible(false);
      setTimeout(() => {
        setIndex(nextIndex);
        setItem(data[nextIndex]);
        setVisible(true);
      }, fadeAnimationDuration);
    },
    [data, visible]
  );

  const itemChange = useCallback(
    (nextIndex: number) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        handleItemChange(nextIndex + 1);
      }, changeAnimationDuration);
    },
    [handleItemChange]
  );

  useEffect(() => {
    itemChange(index);
  }, [index, itemChange]);

  const name = "title" in item ? item.title : item.name;
  const href = `${"title" in item ? "movies" : "series"}/${item.id}`;
  const releaseDate =
    "first_air_date" in item ? item.first_air_date : item.release_date;

  return (
    <div>
      {title && (
        <Title
          title={title}
          icon={icon}
          type={moreLink ? ("title" in data[0] ? "movie" : "tv") : undefined}
          href={hrefParam}
        />
      )}

      <div className="pt-2 md:text-lg px-2">
        <div className="relative w-full h-full overflow-hidden border-2 border-slate-700 rounded-lg bg-black">
          <Link
            href={href}
            className={clsx(
              visible ? "opacity-1" : "opacity-0",
              "duration-300 group"
            )}
          >
            {item.backdrop_path ? (
              <>
                <div className="relative aspect-video md:max-w-[67%]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                    alt={name}
                    key={item.backdrop_path}
                    fill
                    className="duration-700 will-change-transform group-hover:scale-105"
                    blurDataURL="/img/blur.png"
                    placeholder="blur"
                  />
                </div>

                {/* gradient */}
                <div className="hidden md:block absolute bg-gradient-to-l from-black to-transparent right-[33%] top-0 w-1/12 h-full" />
                <div className="hidden md:block absolute bg-gradient-to-l from-black to-transparent right-[33%] top-0 w-1/12 h-full" />
              </>
            ) : (
              <div
                className={clsx("relative md:w-2/3 aspect-video text-center")}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="opacity-0 md:opacity-100">
                    No image for this one
                  </span>
                </div>
              </div>
            )}

            <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
              <div className="hidden md:block md:col-span-2" />
              <div
                className={clsx(
                  "col-span-3 md:col-span-1 *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black md:bg-opacity-100 bg-opacity-50 text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent",
                  !overflow && "flex flex-col items-center justify-center"
                )}
                ref={divRef}
              >
                <Overview
                  title={name}
                  date={releaseDate}
                  voteAvg={item.vote_average}
                />
              </div>
            </div>
          </Link>

          <Panel index={index} handleItemChange={handleItemChange} />
        </div>
      </div>
    </div>
  );
}

type OverviewProps = {
  title: string;
  date: string;
  voteAvg: number;
};

function Overview({ title, voteAvg, date }: OverviewProps) {
  return (
    <div className="flex flex-col pb-10 md:pb-0 md:justify-center gap-1 md:gap-4 xl:gap-6">
      <div className="text-white text-center hidden md:block">{date}</div>
      <div className="text-primary text-center">
        {title} ({new Date(date).getFullYear()})
      </div>
      <Stars voteAvg={voteAvg} responsive />
      <div className="hidden md:block">
        <AvgRating voteAvg={voteAvg} />
      </div>
    </div>
  );
}
