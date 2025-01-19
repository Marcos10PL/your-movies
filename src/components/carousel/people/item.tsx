import { useEffect, useState } from "react";
import { CastMember} from "@/lib/definitions";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import Image from "next/image";

type ItemProps = {
  item: CastMember;
};

export default function Item({ item }: ItemProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [item.profile_path]);

  return (
    <div
      key={item.id}
      className={clsx(
        "relative min-w-44 overflow-hidden cursor-pointer first:ml-2 last:mr-2 rounded-lg border-2 border-slate-700 my-1 transition-all duration-200 group"
      )}
    >
      {item.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
          alt={item.name}
          fill
          className={clsx(
            "w-full h-full transition-all will-change-transform duration-500 group-hover:scale-105",
            loading ? "opacity-0" : "opacity-100"
          )}
        />
      ) : (
        <div
          className={clsx(
            "text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-500 group-hover:scale-105",
            loading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setLoading(false)}
        >
          {item.name}
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}
