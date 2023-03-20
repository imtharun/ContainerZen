import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlinePlusCircle as PlusIcon,
  AiOutlineSearch as SearchIcon,
} from "react-icons/ai";
import { TbRefresh as RefreshIcon } from "react-icons/tb";

const Table = ({ headers, rows }) => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");

  console.log();

  return (
    <div className="h-[90vh] bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-8 pb-4 overflow-y-scroll no-scrollbar">
      <div className="bg-light flex justify-between text-dark p-3 rounded-t-md flex-col sm:flex-row items-center">
        <div className="flex items-center">
          <h1 className="font-medium text-base text-center">Applications </h1>
          <button className="ml-2">
            <Link href="/applications/deploy">
              <PlusIcon className="w-5 h-5" />
            </Link>
          </button>
          <button className="ml-2">
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
        <Search search={search} setSearch={setSearch} searchRef={searchRef} />
      </div>
      <div className="bg-mid-dark rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        <T headers={headers} search={search} rows={rows} />
      </div>
    </div>
  );
};

const Search = ({ searchRef, search, setSearch }) => {
  return (
    <div className="border-b-[1.5px] text-dark border-b-mid-dark w-[15rem] text-sm flex justify-between p-1 items-center">
      <input
        placeholder="Search"
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

const T = ({ search, headers, rows }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 no-scrollbar">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {headers.map((ele, index) => {
                    return (
                      <th key={index + 1} scope="col" className="px-6 py-4">
                        {ele}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {search === "" ? (
                  rows.map((row, index) => {
                    return (
                      <tr
                        key={index + 1}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {row.Id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {row.Names[0]}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {row.State}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {row.Image}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {row.Ports.length === 0
                            ? "-"
                            : row.Ports[0].PrivatePort}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {"" + new Date(+row.Created * 1000).toDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : rows.filter((row) =>
                    row.name.toLowerCase().includes(search)
                  ).length !== 0 ? (
                  rows
                    .filter((row) => row.name.toLowerCase().includes(search))
                    .map((row, index) => {
                      return (
                        <tr
                          key={index + 1}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.project}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.status}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.image}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {/* {row.ports} */}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.createdAt}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td className="text-center p-4" colSpan="6">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
