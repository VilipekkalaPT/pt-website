import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
}

export default function Search({ searchTerm, handleSearch }: SearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-full"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </span>
    </div>
  );
}
