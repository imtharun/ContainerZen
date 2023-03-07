import React from "react";
import Header from "@/components/Header.jsx";
import SideBar from "@/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Header heading="Home" user="Admin" />
      <SideBar />
    </div>
  );
};

export default Layout;
