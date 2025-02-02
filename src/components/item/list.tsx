import { CastMember, CrewMember } from "@/lib/definitions";

type ListProps = {
  array: CastMember[] | CrewMember[];
  title: string;
};

export default function List({ array, title }: ListProps) {
  if (array.length === 0) return;

  return (
    <details>
      <summary className="px-2 py-2 cursor-pointer hover:bg-gray-900 hover:text-primary">
        {title} - click here to expand{" "}
      </summary>
      <p className="px-2">
        {array.map((item, index) => {
          const character = "character" in item ? item.character : item.job;
          return (
            <span key={index}>
              {item.name}
              {character && (
                <span className="text-emerald-200">{" - " + character}</span>
              )}
              {array.length - 1 !== index && ", "}
            </span>
          );
        })}
      </p>
    </details>
  );
}
