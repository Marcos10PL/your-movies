export default function AvgRating({ voteAvg }: { voteAvg: number }) {
  return (
    <div className="text-center">{Math.round(voteAvg * 100) / 100} / 10</div>
  );
}
