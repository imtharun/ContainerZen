import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const Dashboard = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  const getContainers = async () => {
    const res = await axios.get("http://localhost:5000/api/currStats");
    setData(res.data);
  };

  useEffect(() => {
    // setInterval(() => {
    getContainers();
    // }, 1000);
  }, []);

  return (
    <div className="flex flex-col bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-4 pb-4 h-[90vh]">
      <h1 className="bg-light text-dark p-2 rounded-t-md font-medium text-lg">
        Dashboard
      </h1>
      <div className="bg-mid-dark flex flex-wrap justify-center lg:justify-start rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        {data &&
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
          })}
      </div>
    </div>
  );
};

export default Dashboard;
