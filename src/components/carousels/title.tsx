import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";

const iconMap = {
  ArrowTrendingUpIcon,
  StarIcon
} as const;

export type IconType = keyof typeof iconMap;

type TitleProps = {
  title: string;
  icon?: IconType;
};

export default function Title({ title, icon }: TitleProps) {
  const Icon = icon ? iconMap[icon] : null;
  return (
    <h2 className="px-2 flex items-center gap-2">
      {title} {Icon && <Icon className="w-6 xl:w-7" />}
    </h2>
  );
}
