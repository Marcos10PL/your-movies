import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ButtonProps = {
  position: "left" | "right";
  onClick: () => void;
  disabled: boolean;
};

export default function Button({ position, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={clsx(
        "transition-colors border-2 border-slate-700 hover:text-primary hover:bg-slate-800 py-3 px-2 mx-4 bg-slate-900 bg-opacity-60 rounded-lg",
        position === "left" ? "left-0" : "right-0",
        disabled && "pointer-events-none opacity-50"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {position === "left" ? (
        <ChevronDoubleLeftIcon className="w-5" />
      ) : (
        <ChevronDoubleRightIcon className="w-5" />
      )}
    </button>
  );
}
