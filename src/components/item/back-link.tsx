import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type BackLinkProps = {
  href: string;
  content: string;
};

export default function BackLink({ href, content }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 hover:bg-slate-900 hover:text-primary md:rounded-md md:w-fit px-2 py-2 md:mb-2 w-full"
    >
      <ArrowLeftIcon className="w-6 h-6" />
      <div className="text-xl">{content}</div>
    </Link>
  );
}
