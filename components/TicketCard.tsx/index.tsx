"use client";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import React from "react";

export default function TicketCard({ item }) {
  const deleteHandler = async () => {};
  return (
    <form className=" flex flex-col items-center justify-center rounded-md bg-body-color bg-opacity-50 p-10">
      <div className="flex w-full justify-end  text-end">
        <button type="button" onClick={() => deleteHandler()}>
          <DeleteSvg />
        </button>
      </div>

      <label
        htmlFor="subtitle"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Title
      </label>
      <input
        type="text"
        name="subtitle"
        id="subtitle"
        // value={subtitle}
        // onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Enter category title"
        required
        className="mb-3 w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="subpath"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Path
      </label>
      <input
        type="text"
        name="subpath"
        id="subpath"
        // value={subpath}
        // onChange={(e) => setSubpath(e.target.value)}
        placeholder="Enter category path"
        required
        className=" mb-3 w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="subnewtab"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Open this in newtab?
      </label>

      <select
        name="subnewtab"
        id="subnewtab"
        required
        // value={subnewtab}
        // onChange={(e) => setSubnewTab(e.target.value)}
        className="mb-5 w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <div className="flex w-full items-center justify-end">
        <button
          type="submit"
          className="rounded-md bg-green px-4 py-2 text-center text-[14px]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
