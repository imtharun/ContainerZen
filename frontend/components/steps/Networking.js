import React from "react";
import { useStepperContext } from "@/contexts/StepperContext";

const Networking = () => {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
          <input
            onChange={handleChange}
            value={userData["networkname"] || ""}
            name="networkname"
            placeholder="Network"
            className="p-1 px-2 bg-transparent appearance-none outline-none w-full text-light"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
          <input
            onChange={handleChange}
            value={userData["networktype"] || ""}
            name="networktype"
            placeholder="Network Mode"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-light bg-transparent"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full mx-2 flex-1">
          <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
            <input
              onChange={handleChange}
              value={userData["hostport"] || ""}
              name="hostport"
              placeholder="Host Port"
              type="text"
              className="p-1 px-2 appearance-none outline-none w-full text-light bg-transparent"
            />
          </div>
        </div>
        :
        <div className="w-full mx-2 flex-1">
          <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
            <input
              onChange={handleChange}
              value={userData["containerport"] || ""}
              name="containerport"
              placeholder="Container Port"
              type="text"
              className="p-1 px-2 appearance-none outline-none w-full text-light bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networking;
