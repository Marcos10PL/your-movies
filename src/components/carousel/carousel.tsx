"use client";

import { CastMember, Movie, TvSeries } from "@/lib/definitions";
import { useEffect, useRef, useState } from "react";
import Item from "./item";
import Title, { IconType } from "./title";
import Button from "./button";

type CarouselProps = {
  data: Movie[] | TvSeries[] | CastMember[];
  title?: string;
  icon?: IconType;
  popular?: true;
};

export type scrollFunction = (x: -1 | 1) => void;

export default function Carousel({
  data,
  title,
  icon,
  popular,
}: CarouselProps) {
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
    <div className="py-2">
      {title && <Title title={title} icon={icon} />}

      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-none" ref={carouselRef}>
          {data.map((itm, idx) => (
            <Item key={itm.id} item={itm} index={idx} popular={popular} />
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
