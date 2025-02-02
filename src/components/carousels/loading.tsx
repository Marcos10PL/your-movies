import Spinner from "../spinner";

export default function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}