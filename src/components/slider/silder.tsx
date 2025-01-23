"use client";

import { Movie, TvSeries } from "@/lib/definitions";
import Title from "../carousel/title";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Panel from "./panel";
import AvgRating from "@/components/avg-rating";
import Stars from "@/components/stars";
import Spinner from "@/components/spinner";
import Link from "next/link";

type BackdropProps = {
  data: TvSeries[] | Movie[];
  title: string;
};

export default function Slider({ data, title }: BackdropProps) {
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(data[index]);
  const [loading, setLoading] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const isOverflowing = (element: HTMLElement) => {
      return (
        element.scrollWidth > element.clientWidth ||
        element.scrollHeight > element.clientHeight
      );
    };

    const handleResize = () => {
      const div = ref.current;
      if (div) {
        if (isOverflowing(div)) {
          setOverflow(true);
        } else {
          setOverflow(false);
        }
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [item]);

  const handleItemChange = (nextIndex: number) => {
    if (!visible) return;

    if (nextIndex == data.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = data.length - 1;
    }

    setVisible(false);
    setTimeout(() => {
      setVisible(true);
      setIndex(nextIndex);
      setItem(data[nextIndex]);
    }, 400);
  };

  const href = `${"title" in item ? "movies" : "series"}/${item.id}`;

  return (
    <>
      <Title title={title} />

      <div className="md:pl-2 py-1">
        <div className="relative w-full h-full overflow-hidden md:border-0 border-t-2 border-b-2 border-slate-700 bg-black">
          <Link
            href={href}
            className={clsx(
              visible ? "opacity-1" : "opacity-0",
              "duration-300 group"
            )}
          >
            {item.backdrop_path ? (
              <>
                {loading && <Loading />}

                <Image
                  src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                  alt={"title" in item ? item.title : item.name}
                  key={item.backdrop_path}
                  width={1280}
                  height={720}
                  className={clsx(
                    "duration-300 will-change-transform md:max-w-[67%] group-hover:scale-105 z-30"
                  )}
                  onLoad={() => setLoading(false)}
                />
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

            {item.backdrop_path && (
              <>
                <div className="hidden md:block absolute bg-gradient-to-l from-black to-transparent right-[33%] top-0 w-1/12 h-full" />
                <div className="hidden md:block absolute bg-gradient-to-l from-black to-transparent right-[33%] top-0 w-1/12 h-full" />
              </>
            )}

            <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
              <div className="hidden md:block md:col-span-2" />
              <div
                className={clsx(
                  "col-span-3 md:col-span-1 *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black md:bg-opacity-100 bg-opacity-50 text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent",
                  !overflow && "flex flex-col items-center justify-center"
                )}
                ref={ref}
              >
                <Overview
                  title={"title" in item ? item.title : item.name}
                  date={
                    "first_air_date" in item
                      ? item.first_air_date
                      : item.release_date
                  }
                  voteAvg={item.vote_average}
                />
              </div>
            </div>
          </Link>

          <Panel
            dataLength={data.length}
            index={index}
            handleItemChange={handleItemChange}
          />

          {/* left */}
          <div className="hidden md:block absolute top-0 left-0 w-[1%] h-full bg-gradient-to-r from-gray-950 to-transparent z-50" />
          {/* top */}
          <div className="hidden md:block absolute top-0 w-full h-[8%] bg-gradient-to-b from-gray-950 to-transparent z-50" />
        </div>
      </div>
    </>
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
      <div className="text-white text-center">{date}</div>
      <div className="text-primary text-center">{title}</div>
      <Stars voteAvg={voteAvg} responsive={true} />
      <AvgRating voteAvg={voteAvg} />
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}
