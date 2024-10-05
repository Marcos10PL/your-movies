import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { forwardRef } from "react";
import Spinner from "../spinner";

type BackdropProps = {
  movie: Movie;
  index: number;
  visible: boolean;
  loading: boolean;
  overflow: boolean;
} & React.ComponentProps<"div">;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ movie, index, visible, loading, overflow }, ref) => {
    return (
      <div className="px-2 pb-3">
        <div className="w-full h-full rounded-lg overflow-hidden border-2 border-slate-700 bg-black">
          <div
            className={clsx(
              "w-full h-full relative rounded-lg transition-opacity duration-500 ease-in-out",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className={clsx(
                "w-full md:w-2/3 h-full transition-opacity duration-700 ease-in-out",
                loading ? "opacity-0" : "opacity-100"
              )}
            />

            {loading && (
              <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                <Spinner />
              </div>
            )}

            {/* gradient */}
            <div className="opacity-0 md:opacity-100 absolute inset-0 z-100 w-2/3 bg-gradient-to-l from-black to-transparent" />

            {/* md: index & date */}
            <div className="opacity-0 md:opacity-100 absolute top-0 left-2 rounded-br-2xl rounded-bl-2xl bg-black md:py-1 md:text-3xl border-2 border-t-0 border-slate-400 min-w-10 md:min-w-12 text-center z-50">
              {index}
            </div>

            <div className="opacity-0 md:opacity-100 absolute bottom-0 md:left-2 px-2 py-1 z-50 bg-gradient-to-t from-black to-trasparent lg:text-xl">
              Release date: {movie.release_date}
            </div>

            {/* sm: index & date */}
            <div className="md:opacity-0 absolute top-[-4px] left-1 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
              {index}
            </div>

            <div className="md:opacity-0 absolute top-[-4px] left-12 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
              {movie.release_date}
            </div>

            {/* title & overview */}
            <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
              <div className="hidden md:block md:col-span-2" />
              <div
                className={clsx(
                  "col-span-3 md:col-span-1 h-full *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black md:bg-opacity-100 bg-opacity-50 text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600",
                  !overflow && "flex flex-col items-center justify-center"
                )}
                ref={ref}
              >
                <p className="text-primary self-end text-right md:text-center">
                  {movie.title}
                </p>
                <p className="text-right md:text-center">{movie.overview} </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Backdrop;
