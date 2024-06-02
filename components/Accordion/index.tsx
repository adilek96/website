"use client";
import React, { useState } from "react";
import ArrowsDown from "@/public/images/arrows/arrowsDown";
import ArrowsUp from "@/public/images/arrows/arrowsUp";

export default function Accordion({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-10 ">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex w-full  items-center justify-between rounded-t-sm bg-body-color bg-opacity-10  px-1  py-5  focus:ring-4 rtl:text-right"
      >
        <h2 className=" text-3xl font-bold">Characteristics</h2>
        <span>{open ? <ArrowsUp /> : <ArrowsDown />}</span>
      </button>

      <div className={open ? "block" : "hidden"}>
        <div className="flex w-full items-center justify-between rounded-b-sm bg-body-color  bg-opacity-10   p-5  rtl:text-right">
          {data.characteristics}
        </div>
      </div>
    </div>
  );
}
