import React, { useEffect, useState } from "react";
import Card from "./Card";
import io from "socket.io-client";

const Dashboard = () => {
  // const streamer = async () => {
  //   const socket = io("http://localhost:6000");
  //   socket.on("message", (event) => {
  //     const usageData = JSON.parse(event.data);
  //     console.log(usageData);

  //     console.log(`CPU usage: ${usageData.cpuUsage}%`);
  //     console.log(`Memory usage: ${usageData.memoryUsage}MB`);
  //   });
  // };

  // useEffect(() => {
  //   streamer();
  // }, []);

  return (
    <div className="flex flex-col bg-dark text-light p-2 sm:ml-[3rem] sm:px-[5rem] pt-4 pb-4 h-[90vh]">
      <h1 className="bg-light text-dark p-2 rounded-t-md font-medium text-lg">
        Dashboard
      </h1>
      <div className="bg-mid-dark flex flex-wrap justify-center rounded-b-md p-4 overflow-y-scroll no-scrollbar">
        {/* {console.log(Object.keys(streamingData)) &&
          Object?.keys(streamingData)?.map((key) => {
            console.log(key, streamingData[key][0]);
            return (
              <Card
                name={streamingData[key][0]}
                memUsage={streamingData[key][1]}
                cpuUsage={streamingData[key][2]}
              />
            );
          })} */}
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
