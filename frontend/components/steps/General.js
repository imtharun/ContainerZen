import React from "react";
import { useStepperContext } from "@/contexts/StepperContext";

const General = () => {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
          <input
            onChange={handleChange}
            value={userData["containername"] || ""}
            name="containername"
            placeholder="Name"
            className="bg-transparent w-full appearance-none p-1 px-2 text-light outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
          <input
            onChange={handleChange}
            value={userData["image"] || ""}
            name="image"
            placeholder="Image"
            type="text"
            className="bg-transparent w-full appearance-none p-1 px-2 text-light outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
          <input
            onChange={handleChange}
            value={userData["restartpolicy"]}
            name="restartpolicy"
            placeholder="Restart policy"
            type="text"
            className="bg-transparent w-full appearance-none p-1 px-2 text-light outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default General;
