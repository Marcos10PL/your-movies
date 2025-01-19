import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

type DotsProps = {
  dataLength: number;
  index: number;
};

const visibleDots = 5;

export default function Dots({ dataLength, index }: DotsProps) {
  // Nie zwracaj od razu null - najpierw wywołaj hooki
  const activeDotIndex = useMemo(() => {
    if (dataLength < 3) return -1; // Jeśli liczba elementów jest mniejsza niż 3, nie renderuj kropek
    if (index > dataLength - Math.ceil(visibleDots / 2)) {
      return visibleDots - (dataLength - index + 1);
    }
    if (index >= Math.ceil(visibleDots / 2)) {
      return Math.floor(visibleDots / 2);
    }
    return index - 1;
  }, [index, dataLength]);

  // Jeśli dataLength < 3, renderuj nic (null)
  if (dataLength < 3) return null;

  return (
    <div className="flex items-center justify-center space-x-2 transition-all duration-500 ease-in-out">
      {Array.from({ length: visibleDots }).map((_, i) => (
        <Dot key={i} active={i === activeDotIndex} index={index} />
      ))}
    </div>
  );
}

type DotProps = {
  active?: boolean;
  index: number;
};

function Dot({ active = false, index }: DotProps) {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // Uruchamiamy animację na zmianę indexu
  useEffect(() => {
    setTriggerAnimation(true);
    const timeout = setTimeout(() => {
      setTriggerAnimation(false);
    }, 200); // Czas trwania animacji

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      className={clsx(
        "rounded-full w-1 h-1 lg:w-2 lg:h-2 transition-all duration-500 ease-in-out",
        active ? "bg-white scale-125" : "bg-slate-500",
        active && triggerAnimation && "h-5 lg:h-6" // animacja powiększenia
      )}
    />
  );
}