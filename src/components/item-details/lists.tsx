import { CastMember, CrewMember } from "@/lib/definitions";

type ListProps = {
  array: CastMember[] | CrewMember[];
  title: string;
};

export function List({ array, title }: ListProps) {
  if (array.length === 0) return;

  return (
    <details>
      <summary className="px-2 py-2 cursor-pointer hover:bg-gray-900 hover:text-primary">
        {title} - click here to expand{" "}
      </summary>
      <p className="px-2">
        {array.map((item, index) => (
          <span key={index}>
            {item.name}
            <span className="text-emerald-200">
              {" - "}
              {"character" in item ? item.character : item.job}
            </span>
            {array.length - 1 !== index && ", "}
          </span>
        ))}
      </p>
    </details>
  );
}

type CrewProps = {
  array: CrewMember[];
  header1: string;
  header2?: string;
};


export function Crew({ array, header1, header2 }: CrewProps) {
  if (array.length === 0) return;

  if (!header2) header2 = header1;

  return (
    <div>
      {array.length == 1 ? header1 : header2}
      {array.map((item, index) => (
        <span key={item.id}>
          {item.name}
          {array.length - 1 !== index && ", "}
        </span>
      ))}
    </div>
  );
}