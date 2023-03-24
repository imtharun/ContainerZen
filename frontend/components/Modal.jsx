import React, { useState, useRef } from "react";
import axios from "axios";

const Modal = ({ type, showModal, setShowModal }) => {
  const ref = useRef();
  const [obj, setObj] = useState("");

  const pull = async () => {
    const data = await axios.post(`http://localhost:5000/api/create${type}`, {
      obj,
    });
    if (data.status === 200) {
      setObj("");
    }
  };

  const createHandler = () => {
    pull();
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-dark rounded-t">
                  <h3 className="text-xl text-dark">
                    Create {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h3>
                  <button
                    className="text-dark"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block text-dark outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    ref={ref}
                    onChange={() => setObj(ref.current.value)}
                    value={obj}
                    placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
                    className="bg-transparent outline-none border-b border-b-dark p-2"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-dark rounded-b">
                  <button
                    className="inline-block rounded bg-mid-dark text-light  py-2 px-4 text-lg font-medium hover:opacity-80"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-block rounded bg-mid-dark text-light py-2 px-4 text-lg font-medium hover:opacity-80 ml-8"
                    onClick={() => {
                      setShowModal(false);
                      createHandler();
                    }}
                  >
                    {type === "volume" ? "Create" : "Pull"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default Modal;
