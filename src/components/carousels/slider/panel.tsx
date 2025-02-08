import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type PanelProps = {
  handleItemChange: (index: number) => void;
  index: number;
};

export default function Panel({ handleItemChange, index }: PanelProps) {
  return (
    <>
      <div className="absolute bottom-0 w-full z-50 py-2">
        <div className="relative flex justify-center items-center w-full gap-10">
          <Button position="left" onClick={() => handleItemChange(index - 1)} />
          <Button
            position="right"
            onClick={() => handleItemChange(index + 1)}
          />
        </div>
      {/* gradient */}
      </div>
      <div className="hidden md:block absolute bottom-0 w-2/3 bg-gradient-to-t from-black to-transparent h-1/3 z-40" />
    </>
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
        "hover:text-primary flex-grow p-2 flex justify-center md:flex-none xl:p-5"
      )}
    >
      {position === "left" ? (
        <ChevronLeftIcon className="w-5 xl:w-10" />
      ) : (
        <ChevronRightIcon className="w-5 xl:w-10" />
      )}
    </button>
  );
}
