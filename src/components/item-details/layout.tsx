import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="py-4">
      <Link
        href={'/movies'}
        className="flex items-center gap-2 hover:bg-slate-900 hover:text-primary md:rounded-md md:w-fit px-2 py-2 md:mb-2"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <div className="text-xl">Back</div>
      </Link>
      <div className="relative flex flex-col text-lg md:text-xl xl:text-2xl">{children}</div>
    </div>
  );
}
