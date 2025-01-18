"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="py-4">
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-primary py-1 px-2 rounded-md transition-colors mb-2"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="text-xl">Back</div>
      </button>
      <div className="relative flex flex-col text-lg md:text-xl xl:text-2xl">{children}</div>
    </div>
  );
}
