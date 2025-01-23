import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ButtonProps = {
  position: "left" | "right";
  onClick: () => void;
};

export default function Button({ position, onClick }: ButtonProps) {
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
