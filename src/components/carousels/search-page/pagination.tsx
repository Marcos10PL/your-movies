"use client";

import { useRouter } from "next/navigation";
import Button from "./button";
import { Pages } from "./pages";

type PaginationProps = {
  href: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  href,
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center w-fit max-w-[100%] m-auto">
      <Button
        position="left"
        onClick={() => router.push(`${href}&page=${currentPage - 1}`)}
        disabled={currentPage === 1}
      />

      <Pages currentPage={currentPage} totalPages={totalPages} href={href} />

      <Button
        position="right"
        onClick={() => router.push(`${href}&page=${currentPage + 1}`)}
        disabled={totalPages === currentPage}
      />
    </div>
  );
}

