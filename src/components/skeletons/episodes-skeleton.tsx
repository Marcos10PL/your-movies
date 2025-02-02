export default function EpisodesSkeleton() {
  return (
    <div className="px-2 animate-pulse mt-[-1.2rem]">
      <div className="h-3 bg-gray-800 w-1/4 rounded-full mb-4"></div>
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
      <EpisodeSkeleton />
    </div>
  );
}

function EpisodeSkeleton() {
  return (
    <div className="flex flex-col bg-gray-900 rounded-lg border-2 border-gray-800 mb-4">
      <div className="flex flex-col md:flex-row border-b-2 border-gray-800">
        <div className="relative w-full aspect-video md:w-1/3 xl:w-1/5">
          <div className="animate-pulse">
            <svg
              className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <div className="md:w-2/3 xl:w-4/5 *:mt-3 *:max-w-[80%] *:h-3 *:bg-gray-800 *:rounded-lg pb-3 px-2">
          <div className="w-4/6 bg-gray-600"></div>
          <div className="w-3/5"></div>
          <div></div>
          <div className="w-4/12"></div>
          <div className="w-5/12"></div>
        </div>
      </div>
      <div className="p-2 h-10 bg-slate-950 rounded-lg"></div>
    </div>
  );
}
