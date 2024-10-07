import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";

type DotsProps = {
  dataLength: number;
  index: number;
};

export default function Dots({ dataLength, index }: DotsProps) {
  if (dataLength < 3) return;

  const [dots, setDots] = useState<React.ReactElement[]>([
    <Dot key={uuidv4()} active />,
    <Dot key={uuidv4()} />,
    <Dot key={uuidv4()} />,
    <Dot key={uuidv4()} />,
    <Dot key={uuidv4()} />,
  ]);
  const visibleDots = 5;

  useEffect(() => {
    const newDots = [];
    if (index - 1 >= 2 && index - 1 <= dataLength - visibleDots + 2) {
      for (let i = 0; i < visibleDots; i++) {
        if (i === Math.floor(visibleDots / 2)) {
          newDots.push(<Dot key={uuidv4()} active />);
        } else {
          newDots.push(<Dot key={uuidv4()} />);
        }
      }
    } else if (index >= dataLength - visibleDots) {
      for (let i = 0; i < visibleDots; i++) {
        if (i === index - 1 - (dataLength - visibleDots)) {
          newDots.push(<Dot key={uuidv4()} active />);
        } else {
          newDots.push(<Dot key={uuidv4()} />);
        }
      }
    } else {
      for (let i = 0; i < visibleDots; i++) {
        if (i === index - 1) {
          newDots.push(<Dot key={uuidv4()} active />);
        } else {
          newDots.push(<Dot key={uuidv4()} />);
        }
      }
    }
    setDots(newDots);
  }, [index]);

  return <>{dots}</>;
}

type DotProps = {
  active?: boolean;
} & React.ComponentProps<"div">;

function Dot({ active = false }: DotProps) {
  return (
    <div
      className={clsx(
        "rounded-full w-1 h-1 lg:w-2 lg:h-2 transition-transform duration-500 ease-out",
        active ? "bg-white w-3 h-1 lg:w-5 lg:h-2" : "bg-slate-500"
      )}
    />
  );
}
