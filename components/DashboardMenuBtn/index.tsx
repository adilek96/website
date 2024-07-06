"use client";
import { dashboardMenuToogleState } from "@/store/dashboardMenuToogleState";
import React, { useState } from "react";

export default function index() {
  const navbarOpen = dashboardMenuToogleState((state) => state.navbarOpen);
  const setNavbarOpen = dashboardMenuToogleState(
    (state) => state.setNavbarOpen
  );
  return (
    <div className="absolute left-8 top-8 z-40 ">
      <button
        onClick={() => setNavbarOpen(!navbarOpen)}
        id="navbarToggler"
        className=" translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
      >
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? " top-[7px] rotate-45" : " "
          }`}
        />
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? "opacity-0 " : " "
          }`}
        />
        <span
          className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
            navbarOpen ? " top-[-8px] -rotate-45" : " "
          }`}
        />
      </button>
    </div>
  );
}
