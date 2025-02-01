import Title from "../carousels/title";

export default function SliderSkeleton({ title }: { title: string }) {
  return (
    <div>
      {title && <Title title={title} />}

      <div className="pt-2 md:text-lg px-2">
        <div className="relative w-full h-full overflow-hidden border-2 border-slate-700 rounded-lg bg-gray-800 animate-pulse">
          <div className="relative aspect-video md:max-w-[67%] bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
}
