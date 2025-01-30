type EpisodeProps = {
  params: Promise<{ id: string; nr: string, nrE: string }>;
};

export default async function Episode({ params }: EpisodeProps) {
  console.log(params);

  return(
    <div>
      <h1>Episode</h1>
    </div>
  )
}