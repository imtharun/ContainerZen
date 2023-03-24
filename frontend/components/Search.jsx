import React from "react";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";

const Search = ({ searchWith, searchRef, search, setSearch }) => {
  return (
    <div className="border-b-[1.5px] text-dark border-b-mid-dark w-[15rem] text-sm flex justify-between p-1 items-center">
      <input
        placeholder={`Search with ${searchWith}`}
        className="bg-light outline-none"
        type="text"
        value={search}
        ref={searchRef}
        onChange={() => setSearch(searchRef.current.value)}
      />
      <SearchIcon className="h-4 w-4" />
    </div>
  );
};

export default Search;
