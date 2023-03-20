import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  VscDebugStart as StartIcon,
  VscRefresh as RefreshIcon,
  VscDebugStop as StopIcon,
} from "react-icons/vsc";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import axios from "axios";
import { MdOutlineRestartAlt as RestartIcon } from "react-icons/md";
import { AiOutlinePlusCircle as CreateIcon } from "react-icons/ai";

const Row = () => {
  const [rows, setRows] = useState([]);

  const getContainers = async () => {
    const data = await axios.get("http://localhost:5000/api/listcontainers");
    setRows(data.data);
  };

  useEffect(() => {
    getContainers();
  }, []);

  const post = async (id, type) => {
    const data = await axios.post(
      `http://localhost:5000/api/${type}container`,
      {
        containerId: id,
      }
    );
  };

  const startHandler = (index) => {
    post(rows[index].Id, "start");
  };

  const stopHandler = (index) => {
    post(rows[index].Id, "stop");
  };

  const restartHandler = (index) => {
    post(rows[index].Id, "restart");
  };

  const deleteHandler = (index) => {
    post(rows[index].Id, "delete");
  };

  return (
    <section className="h-[90vh] bg-dark px-10 sm:px-28 text-light pt-5">
      <button
        onClick={getContainers}
        className="flex justify-center items-center bg-light text-dark px-2 py-2 mb-3 rounded "
      >
        Refresh
        <RefreshIcon className="ml-2 w-4 h-4" />
      </button>
      {rows.map((r, index) => {
        return (
          <div
            key={index + 1}
            className="bg-light rounded p-3 my-2 text-dark flex justify-between items-center flex-col sm:flex-row"
          >
            <div className="flex items-center">
              <h1 className="text-lg">{r.Names[0].slice(1)}</h1>
              <p
                className={`text-sm ml-3 ${
                  r.State.toLowerCase() === "running" ||
                  r.State.toLowerCase() === "created"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {r.State}
              </p>
            </div>

            <div className="flex mt-1">
              <div className="flex flex-col sm:flex-row">
                <button
                  id={index}
                  onClick={() => startHandler(index)}
                  className="flex justify-center items-center mr-2"
                >
                  Start
                  <StartIcon className="ml-1 w-4 h-4" />
                </button>

                <button
                  id={index}
                  onClick={() => stopHandler(index)}
                  className="flex justify-center items-center mr-2"
                >
                  Stop
                  <StopIcon className="ml-1 w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row">
                <button
                  id={index}
                  onClick={() => restartHandler(index)}
                  className="flex justify-center items-center mr-3"
                >
                  Restart
                  <RestartIcon className="ml-1 w-4 h-4" />
                </button>
                <button
                  id={index}
                  onClick={() => deleteHandler(index)}
                  className="flex justify-center items-center mr-2"
                >
                  Delete
                  <DeleteIcon className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Row;
