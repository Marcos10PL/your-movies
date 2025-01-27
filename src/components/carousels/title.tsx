import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const iconMap = {
  ArrowTrendingUpIcon,
} as const;

export type IconType = keyof typeof iconMap;

type TitleProps = {
  title: string;
  icon?: IconType;
};

export default function Title({ title, icon }: TitleProps) {
  const Icon = icon ? iconMap[icon] : null;
  return (
    <div className="px-2 flex items-center gap-2">
      <p>{title}</p>
      <p>{Icon && <Icon className="w-7" />}</p>
    </div>
  );
}
