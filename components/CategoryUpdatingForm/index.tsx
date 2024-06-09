"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubFormPath from "../SubFormPath";
import SubCard from "../SubCard";
import { categoryUpdateAction } from "@/app/action/categoryUpdateAction";
import Notification from "../Notification";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";

export default function CategoryUpdatingForm(updateCategory) {
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [newtab, setNewTab] = useState("false");
  const [subMenu, setSubMenu] = useState([]);
  const [subAdd, setSubAdd] = useState(false);

  const notification = notificationState((state) => state.notification);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

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
      setSubMenu(response.data.data[0].submenu);
      setTitle(response.data.data[0].title);
      setPath(response.data.data[0].path);
      setNewTab(response.data.data[0].newTab ? "true" : "false");
    } catch (error) {
      console.log(error);
    }
  };

  const subHandler = () => {
    setSubAdd(!subAdd);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await categoryUpdateAction(formData, updateCategory);

      setNotificationMessage("Operation sucsesfull!");
    } catch (error) {
      setNotificationMessage("Somthing wrong, please try later!");
    } finally {
      setNotification(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          className=" my-10 flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Update Category
        </button>
      </form>
      <div>
        <h3 className="my-5 text-center text-2xl font-bold">Subcategory</h3>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {subMenu.length === 0 ? (
            <div className="flex flex-row items-center justify-center">
              {subAdd ? (
                <SubFormPath updateCategory={updateCategory} />
              ) : (
                <p className="my-10">Not added sub category</p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {subMenu.map((item, index) => (
                <SubCard
                  key={index}
                  item={item}
                  updateCategory={updateCategory}
                />
              ))}
              {subAdd ? <SubFormPath updateCategory={updateCategory} /> : null}
            </div>
          )}

          <button
            type="button"
            onClick={() => subHandler()}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow  text-center   text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
          >
            +
          </button>
        </div>
        {notification ? <Notification /> : null}
      </div>
    </>
  );
}
