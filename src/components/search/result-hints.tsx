import { Movie, TvSeries } from "@/lib/definitions";
import { links } from "@/lib/variables";
import Link from "next/link";

const icons = links.map(link => ({
  icon: link.icon,
  href: link.href,
}));

type ResultHintsProps = {
  results: Movie[] | TvSeries[];
  setIsOpen: (isOpen: boolean) => void;
}

export default function ResultHints({ results, setIsOpen }: ResultHintsProps) {
  return (
    <div className="flex flex-col">
      {results.map(item => {
        const name = "title" in item ? item.title : item.name;
        const href =
          "title" in item ? `/movies/${item.id}` : `/series/${item.id}`;
        const Icon = icons.find(
          icon => icon.href === `/${href.split("/")[1]}`
        )?.icon;

        return (
          <Link
            href={href}
            key={item.id}
            onClick={() => setIsOpen(false)}
            className="border-b border-gray-500 last:border-b-0 last:rounded-b-md first:rounded-t-md hover:bg-gray-800 p-1 transition-colors hover:text-primary"
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="min-w-6 h-6" />}
              <p>{name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
