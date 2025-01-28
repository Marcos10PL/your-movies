type SeasonsProps = {
  params: Promise<{ nr: string }>;
};

export default async function Season({ params }: SeasonsProps) {
  const nr = (await params).nr;

  return(
    <div>
      {nr}
    </div>
  )
}