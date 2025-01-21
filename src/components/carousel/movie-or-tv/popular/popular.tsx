"use client";

import { Backdrop, Movie, TvSeries } from "@/lib/definitions";
import Title from "../../title";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Carousel from "./carousel";
import { optionsGET } from "@/api/options";

type BackdropProps = {
  data: TvSeries[] | Movie[];
  title: string;
};

export default function Popular({ data, title }: BackdropProps) {
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(data[index]);
  const [loading, setLoading] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [backdrops, setBackdrops] = useState<Backdrop[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
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

  useEffect(() => {
    const fetchBackdrops = async (): Promise<Backdrop[]> => {
      try {
        console.log(item.id);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.backdrops && data.backdrops.length > 0)
          setBackdrops(data.backdrops.slice(0, 2));

        return [];
      } catch (error) {
        console.error("Error fetching backdrops:", error);
        return [];
      }
    };

    fetchBackdrops();
  }, [item]);

  const href = `${"title" in item ? "movies" : "series"}/${item.id}`;

  return (
    <>
      <Title title={title} />

      <div className="pb-2">
        <div className="relative w-full h-full overflow-hidden bg-black">
          <Link
            href={href}
            className={clsx(
              visible ? "opacity-1" : "opacity-0",
              "duration-300 will-change-contents group"
            )}
          >
            {item.backdrop_path ? (
              <>
                {loading && <Loading />}

                <Image
                  src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                  alt={"title" in item ? item.title : item.name}
                  width={1280}
                  height={720}
                  className={clsx(
                    "duration-300 will-change-transform ease-in-out md:max-w-[66%] group-hover:scale-105"
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
              <div className="opacity-0 md:opacity-100 absolute inset-0 w-2/3 bg-gradient-to-l from-black to-transparent" />
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
                  description={item.overview}
                />
              </div>

              {/* bottom */}
              <div className="absolute bottom-0 w-full h-[9%] bg-gradient-to-t from-gray-950 to-transparent" />
              {/* left */}
              <div className="hidden md:block absolute w-1/12  left-0 inset-0 bg-gradient-to-r from-gray-950 to-transparent" />
              {/* top */}
              <div className="absolute top-0 w-full h-[9%] bg-gradient-to-b from-gray-950 to-transparent" />
            </div>
          </Link>
        </div>
        <Carousel data={data} backdrops={backdrops} title="" />
      </div>
    </>
  );
}

type OverviewProps = {
  title: string;
  description: string;
};

function Overview({ title, description }: OverviewProps) {
  return (
    <>
      <p className="text-primary self-end text-right md:text-center">{title}</p>
      <p className="text-right md:text-center">{description}</p>
    </>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}
