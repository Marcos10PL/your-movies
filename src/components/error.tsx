export default function Error({ title }: { title: string }) {
  return (
    <div className="px-2 py-2 text-lg">
      {title} - loading failed. This is a server error, sorry.
    </div>
  );
}