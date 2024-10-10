import { MAX_RATING } from "@/lib/definitions";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type StarsProps = {
  voteAvg: number;
};

export default function Stars({ voteAvg }: StarsProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-1">
      <div className="relative h-5 lg:h-6 xl:h-8 2xl:h-10">
        <div className="flex">
          <StarIcons name="StarIconOutline" />
        </div>
        <div
          className="absolute left-0 top-0 flex overflow-hidden"
          style={{
            width: `${Math.round(voteAvg * 100) / 10}%`,
          }}
        >
          <StarIcons name="StarIconSolid" />
        </div>
      </div>
    </div>
  );
}

const starsIcon = {
  StarIconOutline,
  StarIconSolid,
} as const;

const max_rating: MAX_RATING = 10;

type IconType = keyof typeof starsIcon;

type StarIconProps = {
  name: IconType;
};

function StarIcons({ name }: StarIconProps) {
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
