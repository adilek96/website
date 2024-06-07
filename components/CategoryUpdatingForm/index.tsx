"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryUpdatingForm(updateCategory) {
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [newtab, setNewTab] = useState("false");

  useEffect(() => {
    if (updateCategory && updateCategory.updateCategory) {
      fetchData();
    }
  }, [updateCategory]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/category?id=${updateCategory.updateCategory}`
      );

      if (!response.data.data) {
        throw new Error("No data received");
      }

      setTitle(response.data.data[0].title);
      setPath(response.data.data[0].path);
      setNewTab(response.data.data[0].newTab ? "true" : "false");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <label
        htmlFor="title"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter category title"
        required
        className="mb-3 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="path"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Path
      </label>
      <input
        type="text"
        name="path"
        id="path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Enter category path"
        required
        className=" mb-3 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="newtab"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Open this in newtab?
      </label>

      <select
        name="newtab"
        id="newtab"
        required
        value={newtab}
        onChange={(e) => setNewTab(e.target.value)}
        className="mb-5 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      <button
        type="submit"
        className=" flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
      >
        Update Category
      </button>
    </form>
  );
}
