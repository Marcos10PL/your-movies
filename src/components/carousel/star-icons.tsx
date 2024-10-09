import { MAX_RATING } from "@/lib/definitions";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const starsIcon = {
  StarIconOutline,
  StarIconSolid,
} as const;

type IconType = keyof typeof starsIcon;

type StarIconProps = {
  name: IconType;
};

const max_rating: MAX_RATING = 10;

export default function StarIcons({ name }: StarIconProps) {
  const Icon = starsIcon[name];
  const stars = [];

  for (let i = 0; i < max_rating; i++) {
    stars.push(
      <Icon
        className="min-w-4 lg:min-w-6 xl:min-w-8 2xl:min-w-10 h-full"
        key={i}
      />
    );
  }

  return <>{stars}</>;
}
