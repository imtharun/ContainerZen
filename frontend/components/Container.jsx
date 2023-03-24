import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlinePlusCircle as PlusIcon,
  AiOutlineSearch as SearchIcon,
} from "react-icons/ai";
import { VscRefresh as RefreshIcon } from "react-icons/vsc";
import axios from "axios";
import Search from "./Search";
import T from "./T";

const Table = ({ headers, rows, setData }) => {
  const [isChecked, setIsChecked] = useState(new Set());
  const searchRef = useRef();
  const [search, setSearch] = useState("");

  const refreshHandler = async () => {
    const data = await axios.get("http://localhost:5000/api/listcontainers");

    if (data.status === 200) {
      const initialData = [];
      for (var ele of data.data) {
        const obj = {
          col1: ele.Names[0],
          col2: ele.Id,
          col3: ele.State,
          col4: ele.Image,
          col5: ele.Ports.length === 0 ? "-" : ele.Ports[0].PrivatePort,
          col6: ele.Created,
        };

        initialData.push(obj);
        setIsChecked(new Set());
        setData(initialData);
      }
    }
  };

  const post = async (type) => {
    const data = await axios.post(
      `http://localhost:5000/api/${type}container`,
      {
        containerId: Arrays.from(isChecked),
      }
    );

    if (data.status === 200) {
      setData(data.data);
      setIsChecked(new Set());
    }
  };

  const startHandler = () => {
    post("start");
  };

  const stopHandler = () => {
    post("stop");
  };

  const restartHandler = () => {
    post("restart");
  };

  const deleteHandler = () => {
    post("delete");
  };

  const isCheckedHandler = (id) => {
    if (isChecked.has(id)) {
      isChecked.delete(id);
      setIsChecked(new Set(isChecked));
    } else {
      isChecked.add(id);
      setIsChecked(new Set(isChecked));
    }
  };

  return (
    <div className="h-[90vh] bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-8 pb-4 overflow-y-scroll no-scrollbar">
      <div className="bg-light flex justify-between text-dark p-3 rounded-t-md flex-col sm:flex-row items-center">
        <div className="flex items-center">
          <h1 className="font-medium text-base text-center">Containers </h1>
          <button className="ml-2">
            <Link title="Add" href="/containers/deploy">
              <PlusIcon className="w-5 h-5" />
            </Link>
          </button>
          <button title="Refresh" onClick={refreshHandler} className="ml-2">
            <RefreshIcon className="w-5 h-5" />
          </button>
        </div>
        <Search
          searchWith={"Name"}
          search={search}
          setSearch={setSearch}
          searchRef={searchRef}
        />
      </div>
      <div className="bg-mid-dark rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        <button
          className="inline-block rounded bg-light text-dark py-1 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50 mx-1"
          onClick={startHandler}
          title="Start"
          disabled={isChecked.size === 0}
        >
          Start
        </button>
        <button
          className="inline-block rounded bg-light text-dark py-1 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50 mx-1"
          onClick={stopHandler}
          title="Stop"
          disabled={isChecked.size === 0}
        >
          Stop
        </button>
        <button
          className="inline-block rounded bg-light text-dark py-1 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50 mx-1"
          onClick={restartHandler}
          title="Restart"
          disabled={isChecked.size === 0}
        >
          Restart
        </button>
        <button
          className="inline-block rounded bg-light text-dark py-1 px-4 text-lg font-medium hover:opacity-50 disabled:opacity-50"
          onClick={deleteHandler}
          title="Delete"
          disabled={isChecked.size === 0}
        >
          Delete
        </button>

        <T
          forWhat="container"
          headers={headers}
          search={search}
          rows={rows}
          isChecked={isChecked}
          isCheckedHandler={isCheckedHandler}
          filter="col1"
        />
      </div>
    </div>
  );
};

export default Table;