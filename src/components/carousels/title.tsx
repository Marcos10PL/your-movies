import {
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const iconMap = {
  ArrowTrendingUpIcon,
  StarIcon,
} as const;

export type IconType = keyof typeof iconMap;

type TitleProps = {
  title: string;
  icon?: IconType;
  type?: "movie" | "tv";
  href?: string;
};

export default function Title({ title, icon, type, href }: TitleProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="flex justify-between items-center">
      <h2 className="px-2 flex items-center gap-2">
        {title} {Icon && <Icon className="w-6 xl:w-7" />}
      </h2>
      {type && (
        <Link
          href={href || `more?title=${title}&type=${type}&page=1`}
          className="flex gap-1 items-center pr-2 hover:text-primary transition-colors"
        >
          <p>More...</p>
          <ArrowUpRightIcon className="w-5" />
        </Link>
      )}
    </div>
  );
}
