import React from "react";

const Card = ({ name, cpuUsage, memUsage, memPercent, totMem }) => {
  return (
    <div className="bg-dark w-[15rem] p-4 m-2 rounded-md">
      <h1 className="text-lg text-medium">{name.slice(0)}</h1>
      <div className="text-sm flex flex-col my-1">
        CPU Usage,
        <Progress usage={cpuUsage} />
        {(cpuUsage === "NaN" ? 0.0 : cpuUsage) + "%"}
      </div>
      <div className="text-sm flex flex-col">
        MEM Usage, <Progress usage={memPercent} />
        {(memPercent === "NaN" ? 0.0 : memPercent) +
          "%, " +
          memUsage +
          " MB / " +
          Math.round((totMem / 1000) * 100) / 100 +
          "GB"}
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
