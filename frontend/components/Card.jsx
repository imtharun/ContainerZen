import React from "react";

const Card = ({ name, cpuUsage, memUsage }) => {
  return (
    <div className="bg-dark w-[15rem] p-4 m-2 rounded-md">
      <h1 className="text-lg text-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <div className="text-sm flex flex-col my-1">
        CPU Usage {cpuUsage + "%"}
        <Progress usage={cpuUsage} />
      </div>
      <div className="text-sm flex flex-col">
        MEM Usage {memUsage + "%"}
        <Progress usage={memUsage} />
      </div>
    </div>
  );
};

const Progress = ({ usage }) => {
  return (
    <div className="my-2 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
      <div className="h-1 bg-green-500" style={{ width: usage + "%" }}></div>
    </div>
  );
};

export default Card;
