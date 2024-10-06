import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ArrowTrendingUpIcon: ArrowTrendingUpIcon,
};

type TitleProps = {
  title: string;
  icon?: string;
};

export default function Title({ title, icon }: TitleProps) {
  const Icon = icon ? iconMap[icon] : null;
  return (
    <div className="text-xl px-2 py-1 flex items-center gap-2">
      <p>{title}</p>
      <p>{Icon && <Icon className="w-7" />}</p>
    </div>
  );
}
