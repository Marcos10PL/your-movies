import Title from "@/components/carousels/title";

export default function VideoCarouselSkeleton({ title }: { title?: string }) {
  return (
    <>
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
    </>
  );
}

function Item() {
  return (
    <div className="relative min-w-[calc(100%-1rem)] lg:min-w-[calc(50%-1rem)] xl:min-w-[calc(33.33%-1rem)] xxl:min-w-[calc(25%-1rem)] aspect-video rounded-lg border-2 border-slate-700 mx-2 animate-pulse bg-gray-800"></div>
  );
}
