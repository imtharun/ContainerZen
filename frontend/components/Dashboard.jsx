import React from "react";
import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-4 pb-4 h-[90vh]">
      <h1 className="bg-light text-dark p-2 rounded-t-md font-medium text-lg">
        Dashboard
      </h1>
      <div className="bg-mid-dark flex flex-wrap justify-center rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        <Card name="yacht" memUsage={10} cpuUsage={30} />
        <Card name="yacht" memUsage={10} cpuUsage={30} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
        <Card name="portainer" memUsage={30} cpuUsage={70} />
      </div>
    </div>
  );
};

export default Dashboard;
