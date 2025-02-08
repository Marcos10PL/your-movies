import { useState, useEffect, useCallback, useRef } from "react";

export default function useCarouselButtons() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = useCallback((x: -1 | 1) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: x * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const updateScrollButtons = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    updateScrollButtons();

    carousel.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  return { carouselRef, canScrollLeft, canScrollRight, scroll };
}
