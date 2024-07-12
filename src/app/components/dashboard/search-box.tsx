'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
 
export default function SearchBox({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }
 
  return (
    <div className="relative flex flex-1 flex-shrink-0 mx-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-9/12 text-gray-400 placeholder:text-gray-400 !rounded-[0.5rem] bg-[#f0f5ff] py-[9px] pl-10 text-sm outline-2"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}