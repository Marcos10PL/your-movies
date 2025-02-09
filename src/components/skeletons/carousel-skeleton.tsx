import Title from "@/components/carousels/title";

export default function CarouselSkeleton({ title }: { title?: string }) {
  return (
    <div>
      {title ? (
        <Title title={title} />
      ) : (
        <div className="h-3 rounded-full bg-gray-800 w-1/5 mx-2"></div>
      )}
      <div className="relative pt-2">
        <div className="flex overflow-x-auto scrollbar-none">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="relative min-w-[calc(50%-1rem)] md:min-w-[calc(33.3%-1rem)] lg:min-w-[calc(25%-1rem)] xl:min-w-[calc(16.66%-1rem)] xxl:min-w-[calc(12.5%-1rem)] aspect-[2/3] overflow-hidden rounded-lg border-2 border-slate-700 mx-2 animate-pulse bg-gray-800"></div>
  );
}
