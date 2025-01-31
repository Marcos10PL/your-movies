import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ItemDetailsSkeleton() {
  return (
    <div className="py-2">
      <div
        className="flex items-center gap-2 hover:bg-slate-900 hover:text-primary md:rounded-md md:w-fit px-2 py-2 md:mb-2 w-full"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="text-xl">Back</div>
      </div>
      <div className="relative flex flex-col text-lg md:text-xl xl:text-2xl">
        loading...
      </div>
    </div>
  );
}
