import React from "react";
import Link from "next/link";
import { useStepperContext } from "@/contexts/StepperContext";

const Volumes = () => {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setUserData({ ...userData, [name]: value });
  };

  const clickHandler = () => {
    console.log(userData);
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="w-full mx-2 flex-1">
          <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
            <input
              onChange={handleChange}
              value={userData["host"] || ""}
              name="host"
              placeholder="Host"
              className="p-1 px-2 bg-transparent appearance-none outline-none w-full text-light"
            />
          </div>
        </div>
        <div className="w-full mx-2 flex-1">
          <div className="my-2 flex border-b border-b-gray-200 bg-transparent p-1">
            <input
              onChange={handleChange}
              value={userData["container"] || ""}
              name="container"
              placeholder="Container"
              type="text"
              className="p-1 px-2 appearance-none outline-none w-full text-light bg-transparent"
            />
          </div>
        </div>
        <div className="mt-10">
          <Link href={"/applications"}>
            <button
              onClick={clickHandler}
              className="inline-block rounded bg-light text-dark py-2 px-4 text-lg font-medium hover:opacity-50"
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Volumes;
