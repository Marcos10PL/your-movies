"use client";

import { CastMember } from "@/lib/definitions";
import { useRef } from "react";
import clsx from "clsx";
import Title from "../title";
import Item from "./item";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type CarouselProps = {
  title: string;
  data: CastMember[];
};

type scrollFunction = (x: -1 | 1) => void;

export default function Carousel({ data, title }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="pb-2">
      <Title title={title} />

      <div className="relative">
        <div
          className="flex overflow-x-auto gap-3 scrollbar-none"
          ref={carouselRef}
        >
          {data.map((itm, idx) => (
            <Item key={idx} item={itm} />
          ))}
        </div>

        <Button position="left" onClick={() => scroll(-1)} />
        <Button position="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}

type ButtonProps = {
  position: "left" | "right";
  onClick: () => void;
};

function Button({ position, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        "transition-bg-opacity duration-300 hover:text-primary hover:bg-opacity-100 absolute top-1/2 transform -translate-y-1/2 py-5 px-2 mx-4 bg-black bg-opacity-60 rounded-lg",
        position === "left" ? "left-0" : "right-0"
      )}
      onClick={onClick}
    >
      {position === "left" ? (
        <ChevronDoubleLeftIcon className="w-5" />
      ) : (
        <ChevronDoubleRightIcon className="w-5" />
      )}
    </button>
  );
}
