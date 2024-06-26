"use client";
import React, { useState, useRef } from "react";
import { subAddAction } from "@/app/actions/subAddAction";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";

export default function SubFormPath({ updateCategory }) {
  const [subtitle, setSubtitle] = useState("");
  const [subpath, setSubpath] = useState("");
  const [subnewtab, setSubnewTab] = useState("false");
  const formRef = useRef(null);

  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formRef);

    try {
      await subAddAction(formData, updateCategory);
      setNotificationMessage("Operation sucsesfull!");
    } catch (error) {
      setNotificationMessage("Somthing wrong, please try later!");
    } finally {
      setNotification(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      // Сбрасываем состояние полей формы
      setSubtitle("");
      setSubpath("");
      setSubnewTab("false");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center rounded-md bg-body-color  p-10"
    >
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
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Enter category title"
        required
        className="mb-3 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
        value={subpath}
        onChange={(e) => setSubpath(e.target.value)}
        placeholder="Enter category path"
        required
        className=" mb-3 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
        value={subnewtab}
        onChange={(e) => setSubnewTab(e.target.value)}
        className="mb-5 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <div className="flex w-full items-center justify-end">
        <button
          type="submit"
          className="rounded-md bg-green py-2 px-4 text-center text-[14px]"
        >
          Add
        </button>
      </div>
    </form>
  );
}
