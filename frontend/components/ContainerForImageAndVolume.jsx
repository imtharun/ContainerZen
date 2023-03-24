import React, { useRef, useState } from "react";
import T from "@/components/T";
import Search from "@/components/Search";
import Modal from "@/components/Modal";
import { AiOutlinePlusCircle as PlusIcon } from "react-icons/ai";
import { VscRefresh as RefreshIcon } from "react-icons/vsc";

const TableTemp = ({
  isChecked,
  setIsChecked,
  type,
  headers,
  rows,
  deleteObj,
  refreshHandler,
}) => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isCheckedHandler = (val) => {
    if (isChecked.has(val)) {
      isChecked.delete(val);
      setIsChecked(new Set(isChecked));
    } else {
      isChecked.add(val);
      setIsChecked(new Set(isChecked));
    }
  };

  const deleteHandler = () => {
    deleteObj();
  };

  return (
    <section className="h-[90vh] bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-8 pb-4 overflow-y-scroll no-scrollbar">
      <div className="bg-light flex justify-between text-dark p-3 rounded-t-md flex-col sm:flex-row items-center">
        <div className="flex items-center">
          <h1 className="font-medium text-base text-center">
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </h1>
          <button
            title="Add"
            onClick={() => setShowModal(!showModal)}
            type="button"
            className="pl-2"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <Modal
            type={type}
            setShowModal={setShowModal}
            showModal={showModal}
          />
          <button title="Refresh" onClick={refreshHandler} className="ml-2">
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
        <Search
          searchWith={type === "image" ? "Tag" : "Name"}
          search={search}
          setSearch={setSearch}
          searchRef={searchRef}
        />
      </div>
      <div className="bg-mid-dark rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        <button
          className="inline-block rounded bg-light text-dark py-1 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50"
          onClick={deleteHandler}
          disabled={isChecked.size === 0}
        >
          Delete
        </button>
        <T
          forWhat={type}
          headers={headers}
          search={search}
          rows={rows}
          isChecked={isChecked}
          isCheckedHandler={isCheckedHandler}
          filter="col1"
        />
      </div>
    </section>
  );
};

export default TableTemp;
