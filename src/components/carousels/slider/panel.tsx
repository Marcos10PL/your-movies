import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type PanelProps = {
  handleItemChange: (index: number) => void;
  dataLength: number;
  index: number;
};

export default function Panel({
  handleItemChange,
  dataLength,
  index,
}: PanelProps) {
  return (
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent z-50 py-2">
      <div className="relative flex justify-center items-center w-full">
        <Button position="left" onClick={() => handleItemChange(index - 1)} />
        <Number index={index} dataLength={dataLength} />
        <Button position="right" onClick={() => handleItemChange(index + 1)} />
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

type NumberProps = {
  index: number;
  dataLength: number;
};

function Number({ index, dataLength }: NumberProps) {
  return (
    <div className="w-24 text-center xl:text-xl">
      {`${index + 1} / ${dataLength}`}
    </div>
  );
}
