import React, { useState } from "react";
import Card from "./Card";

const Dashboard = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  return (
    <div className="flex flex-col bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-4 pb-4 h-[90vh]">
      <h1 className="bg-light text-dark p-2 rounded-t-md font-medium text-lg">
        Dashboard
      </h1>
      <div className="bg-mid-dark flex flex-wrap justify-center lg:justify-start rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        {data.length !== 0 ? (
          data.map((ele, index) => {
            return (
              <Card
                key={index + 1}
                name={ele.name.slice(1)}
                cpuUsage={ele.cpuUsage}
                memPercent={ele.memoryPercent}
                memUsage={ele.memoryUsage}
                totMem={ele.totalMemory}
              />
            );
          })
        ) : (
          <p className="flex justify-center items-center w-full">
            No containers are running currently
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
