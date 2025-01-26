"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Backdrop } from "./backdrop";

type LayoutProps = {
  title: string;
  backdropPath: string;
  children: Readonly<React.ReactNode>;
};

export default function Layout({ children, title, backdropPath }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="py-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 hover:bg-slate-900 hover:text-primary md:rounded-md md:w-fit px-2 py-2 md:mb-2 w-full"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="text-xl">Back</div>
      </button>
      <div className="relative flex flex-col text-lg md:text-xl xl:text-2xl">
        <Backdrop title={title} backdropPath={backdropPath} />
        <div className="z-20">{children}</div>
      </div>
    </div>
  );
}
