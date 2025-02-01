export default function ItemDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-2 w-full animate-pulse">
      <div className="h-10 md:rounded-lg bg-gray-900 w-full md:w-24"></div>

      <div
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div className="flex items-center justify-center bg-gray-800 relative md:hidden w-full aspect-video">
          <svg
            className="w-10 h-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>

      <div className="relative flex flex-col px-2">
        <div className="h-5 rounded-lg bg-gray-800 w-1/3 my-4"></div>
        <div className="md:w-3/5 xl:w-2/6 *:mt-3 *:max-w-[80%] *:h-3 *:bg-gray-800 *:rounded-lg">
          <div className="w-4/6"></div>
          <div className="w-3/5"></div>
          <div></div>
          <div className="w-4/12"></div>
          <div className="w-4/6"></div>
          <div></div>
          <div className="w-1/2"></div>
          <div className="w-5/12"></div>
          <div className="w-4/6"></div>
          <div className="w-4/12"></div>
          <div className="w-4/6"></div>
          <div></div>
          <div className="w-1/2"></div>
          <div className="w-5/12"></div>
        </div>
        <div className="md:w-3/5 xl:w-2/6 pt-3 *:mt-3 *:h-3 *:bg-gray-800 *:rounded-lg *:max-w-[80%]">
          <div className="w-4/12"></div>
          <div className="w-4/6"></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
