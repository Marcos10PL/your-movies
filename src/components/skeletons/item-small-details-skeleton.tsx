export default function ItemSmallDetailSkeleton() {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="h-10 md:rounded-lg bg-gray-900 w-full md:w-24"></div>

      <div className="relative flex flex-col px-2">
        <div className="h-5 rounded-lg bg-gray-800 w-1/3 my-4"></div>
        <div className="md:w-3/5 xl:w-2/6 *:mt-3 *:max-w-[80%] *:h-3 *:bg-gray-800 *:rounded-lg">
          <div className="w-4/6"></div>
          <div className="w-3/5"></div>
          <div></div>
          <div className="w-4/12"></div>
          <div className="w-4/6"></div>
          <div></div>
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
