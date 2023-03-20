import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const Dashboard = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  const getContainers = async () => {
    console.log("chaginh");
    const res = await axios.get("http://localhost:5000/api/currStats");
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getContainers();
  }, []);

  return (
    <div className="flex flex-col bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-4 pb-4 h-[90vh]">
      <h1 className="bg-light text-dark p-2 rounded-t-md font-medium text-lg">
        Dashboard
      </h1>
      <div className="bg-mid-dark flex flex-wrap justify-center rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        {data.map((ele) => {
          console.log(ele);
          return (
            <Card
              name={ele.name}
              cpuUsage={ele.cpuUsage}
              memUsage={ele.memoryUsage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
