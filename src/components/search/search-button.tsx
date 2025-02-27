import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchButtonProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function SearchButton({ setIsOpen }: SearchButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 hover:text-primary rounded-md pl-2 transition-colors"
      onClick={() => setIsOpen(true)}
    >
      <MagnifyingGlassIcon className="w-6" />
      <p>Search</p>
    </button>
  );
}
