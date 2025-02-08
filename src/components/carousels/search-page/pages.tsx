import { generatePagination, generatePaginationMobile } from "@/lib/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type PagesProps = {
  currentPage: number;
  totalPages: number;
  href: string;
};

export function Pages({ currentPage, totalPages, href }: PagesProps) {
  const [pagination, setPagination] = useState(() =>
    generatePagination(currentPage, totalPages)
  );
  const router = useRouter();

  const updatePagination = useCallback(() => {
    if (window.innerWidth < 640) {
      setPagination(generatePaginationMobile(currentPage, totalPages));
    } else {
      setPagination(generatePagination(currentPage, totalPages));
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    updatePagination();
    window.addEventListener("resize", updatePagination);
    return () => window.removeEventListener("resize", updatePagination);
  }, [updatePagination]);

  return (
    <div className="flex justify-center border-2 rounded-lg w-fit m-auto overflow-hidden border-slate-700 bg-slate-900">
      {pagination.map((page, index) =>
        page === "..." ? (
          <span className="border-l-2 px-3 border-slate-700" key={index}>
            {page}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => router.push(`${href}&page=${page}`)}
            className={clsx(
              "border-l-2 border-slate-700 py-1 px-3 hover:bg-slate-800 transition-colors hover:text-primary first:border-l-0",
              page === currentPage &&
                "bg-slate-800 text-primary pointer-events-none"
            )}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
