"use client";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function SearchBar({ isOpen, setIsOpen }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center gap-1 w-full px-4 md:mt-2 lg:mt-0 lg:pl-0"
    >
      <button
        type="submit"
        className="hover:bg-slate-800 hover:text-primary py-1 px-2 rounded-md transition-colors"
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className="border text-black rounded-md py-1 px-2 lg:py-0 w-full"
        autoFocus
        onBlur={() => setIsOpen(false)}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-100 transition-colors"
      >
        <XCircleIcon className="w-6 h-6" />
      </button>
    </form>
  );
}
