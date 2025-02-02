import { CrewMember } from "@/lib/definitions";

type CrewProps = {
  directors: CrewMember[];
  writers: CrewMember[];
  screenwriters?: CrewMember[];
  novel?: CrewMember[];
};

export default function Crew({
  directors,
  writers,
  screenwriters,
  novel,
}: CrewProps) {
  if (
    directors.length === 0 &&
    writers.length === 0 &&
    screenwriters?.length === 0 &&
    novel?.length === 0
  )
    return null;

  return (
    <div className="px-2 *:pb-1">
      <CrewGroup array={directors} header1="Director" header2="Directors" />
      <CrewGroup array={writers} header1="Writer" header2="Writers" />
      <CrewGroup
        array={screenwriters}
        header1="Screenwriter"
        header2="Screenwriters"
      />
      <CrewGroup array={novel} header1="Novel" />
    </div>
  );
}

type CrewGroupProps = {
  array: CrewMember[] | undefined;
  header1: string;
  header2?: string;
};

function CrewGroup({ array, header1, header2 }: CrewGroupProps) {
  if (array?.length === 0 || !array) return;

  if (!header2) header2 = header1;

  return (
    <div>
      {array.length === 1 ? header1 : header2}
      {": "}
      {array.map((item, index) => (
        <span key={item.id}>
          {item.name}
          {array.length - 1 !== index && ", "}
        </span>
      ))}
    </div>
  );
}
