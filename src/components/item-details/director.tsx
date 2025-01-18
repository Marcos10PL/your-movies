import { Credits, CrewMember } from "@/lib/definitions";

type DirectorProps = {
  promise: Promise<Credits>;
};

export default async function Director({ promise }: DirectorProps) {
  const { crew } = await promise;
  const director: CrewMember | undefined = crew.find(
    member => member.job === "Director"
  );

  if (!director) return <p>Director information not available</p>;

  return <p>Director: {director.name}</p>;
}
