"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import Button from "./button";

type PaginationProps = {
  pagination: (string | number)[];
  href: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  pagination,
  href,
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center w-fit m-auto">
      <Button
        position="left"
        onClick={() => router.push(`${href}&page=${currentPage - 1}`)}
        disabled={currentPage === 1}
      />

      <div className="flex justify-center border-2 rounded-lg w-fit m-auto overflow-hidden border-slate-700 bg-slate-900">
        {pagination.map((page, index) =>
          page === "..." ? (
            <span className="border-l-2 px-3 border-slate-700 " key={index}>
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
      <Button
        position="right"
        onClick={() => router.push(`${href}&page=${currentPage + 1}`)}
        disabled={totalPages === currentPage}
      />
    </div>
  );
}
