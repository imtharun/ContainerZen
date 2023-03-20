import React, { useEffect, useState } from "react";
import Card from "./Card";

const Dashboard = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:6000/");
    console.log(socket);
    socket.addEventListener("open", () => {
      console.log("Connected to server");
    });

    socket.addEventListener("close", () => {
      console.log("Disconnected from server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });

    window.addEventListener("beforeunload", function () {
      socket.close();
    });
  }, []);

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
