import { CrewMember } from "@/lib/definitions";

type CrewProps = {
  array: CrewMember[];
  header1: string;
  header2?: string;
};

export default function Crew({ array, header1, header2 }: CrewProps) {
  if (array.length === 0) return;

  if(!header2) header2 = header1;

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