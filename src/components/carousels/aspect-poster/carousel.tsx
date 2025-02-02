"use client";

import { Item as Data } from "@/lib/definitions";
import { useEffect, useRef, useState } from "react";
import Title, { IconType } from "../title";
import Button from "../button";
import Item from "./item";
import { useParams } from "next/navigation";
import { mapToCarouselItem } from "@/lib/utils";

type CarouselProps = {
  data: Data[];
  title: string;
  icon?: IconType;
  numbers?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
};

export default function Carousel({
  data,
  title,
  icon,
  numbers,
  noLink,
  overlayAlwaysVisible,
}: CarouselProps) {
  if (data.length === 0) return null;

  const carouselRef = useRef<HTMLDivElement>(null!);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { id: seriesId } = useParams();
  const items = data.map(itm => mapToCarouselItem(itm, seriesId, noLink));

  const scroll = (x: -1 | 1) => {
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
      {title && <Title title={title} icon={icon} />}

      <div className="relative pt-2">
        <div className="flex overflow-x-auto scrollbar-none" ref={carouselRef}>
          {items.map((itm, idx) => (
            <Item
              key={itm.id}
              item={itm}
              index={idx}
              numbers={numbers}
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
