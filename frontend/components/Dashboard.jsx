import React from "react";
import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-dark text-light p-2 px-[5rem] pt-[2rem] h-[90vh] ">
      <h1 className="bg-light text-dark p-2 rounded-t-md">Dashboard</h1>
      <div className="bg-mid-dark flex  rounded-b-md p-4">
        <Card name="yacht" memUsage={10} cpuUsage={30} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
      </div>
    </div>
  );
};

export default Dashboard;
