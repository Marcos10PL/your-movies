import { Movie } from "@/lib/definitions";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Dots from "./dots";
import clsx from "clsx";

type PanelProps = {
  handleMovieChange: (movie: Movie | null, index: number) => void;
  dataLength: number;
  index: number;
};

export default function Panel({
  handleMovieChange,
  dataLength,
  index,
}: PanelProps) {
  return (
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-12 flex justify-center items-center z-50">
      <div className="relative flex justify-center items-center gap-3 w-full">
        <Button
          position="left"
          onClick={() => handleMovieChange(null, index - 2)}
        />
        <Dots dataLength={dataLength} index={index} />
        <Button
          position="right"
          onClick={() => handleMovieChange(null, index)}
        />
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
      onClick={onClick}
      className={clsx(
        "absolute py-5 px-3 bg-black bg-opacity-50 md:static md:bg-opacity-0 hover:text-primary",
        `${position}-0`,
        position === 'left' ? 'rounded-se-lg' : 'rounded-ss-lg'
      )}
    >
      {position === "left" ? (
        <ChevronLeftIcon className="w-5" />
      ) : (
        <ChevronRightIcon className="w-5" />
      )}
    </button>
  );
}
