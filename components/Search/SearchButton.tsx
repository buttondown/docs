import { SearchIcon } from "@heroicons/react/outline";

export default function SearchButton({
  setSearchOpen,
}: {
  setSearchOpen: (val: boolean) => void;
}) {
  return (
    <div
      onClick={() => setSearchOpen(true)}
      className="flex mx-2 px-2 py-1 border-2 rounded-lg border-gray-400 font-weight-bold text-gray-300 bg-gray-700 text-sm font-semibold cursor-pointer items-center"
    >
      <SearchIcon className="h-5 w-4 mr-2" aria-hidden="true" />
      <div className="flex-1">Search</div>
      <div className="font-mono bg-gray-500 rounded text-gray-100 px-1.5 text-xs">
        /
      </div>
    </div>
  );
}
