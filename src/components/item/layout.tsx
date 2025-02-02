"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Backdrop } from "./backdrop";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  href: string;
} & (
  | { backdropPath: string; title: string }
  | { backdropPath?: never; title?: never }
);

export default function Layout({
  children,
  title,
  backdropPath,
}: LayoutProps) {
  const router = useRouter();

  return (
    <div className="py-2">
      <button
        className="flex items-center gap-2 hover:bg-slate-900 hover:text-primary md:rounded-md md:w-fit px-2 py-2 md:mb-2 w-full"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="text-xl">Back</div>
      </button>
      <div className="relative flex flex-col text-lg md:text-xl xl:text-2xl">
        {backdropPath && <Backdrop title={title} backdropPath={backdropPath} />}
        <div className="z-20 *:pb-3">{children}</div>
      </div>
    </div>
  );
}
