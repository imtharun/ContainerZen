import React from "react";
import Header from "@/components/Header.jsx";
import SideBar from "@/components/SideBar";

import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
});

const Layout = ({ children }) => {
  return (
    <section className={`relative ${poppins.className}`}>
      <Header heading="Home" user="Admin" />
      <SideBar />
      {children}
    </section>
  );
};

export default Layout;
