import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const className = `
  absolute top-1/2 transform -translate-y-1/2 
  py-5 px-2 mx-2 
  bg-black bg-opacity-60 rounded-lg
  hover:bg-opacity-100 transition-bg-opacity duration-300
`;

type ButtonProps = {
  position: "left" | "right";
  onClick: () => void;
};

export default function ({ position, onClick }: ButtonProps) {
  return (
    <button className={clsx(`${position}-0`, className)} onClick={onClick}>
      {position === "left" ? (
        <ChevronDoubleLeftIcon className="w-5" />
      ) : (
        <ChevronDoubleRightIcon className="w-5" />
      )}
    </button>
  );
}
