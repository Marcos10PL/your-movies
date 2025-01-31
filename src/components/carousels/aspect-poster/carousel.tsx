"use client";

import { CastMember, Movie, Season, TvSeries } from "@/lib/definitions";
import { useEffect, useRef, useState } from "react";
import Title, { IconType } from "../title";
import Button from "../button";
import Item from "./item";

export type Item = Movie | TvSeries | CastMember | Season;

type CarouselProps = {
  data: Item[];
  title: string;
  icon?: IconType;
  popular?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
};

export type scrollFunction = (x: -1 | 1) => void;

export default function Carousel({
  data,
  title,
  icon,
  popular,
  noLink,
  overlayAlwaysVisible,
}: CarouselProps) {
  if (data.length === 0) return null;

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
      <Title title={title} icon={icon} />

      <div className="relative pt-2">
        <div className="flex overflow-x-auto scrollbar-none" ref={carouselRef}>
          {data.map((itm, idx) => (
            <Item
              key={itm.id}
              item={itm}
              index={idx}
              popular={popular}
              noLink={noLink}
              overlayAlwaysVisible={overlayAlwaysVisible}
            />
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
