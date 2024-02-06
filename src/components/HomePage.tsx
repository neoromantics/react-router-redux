import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
