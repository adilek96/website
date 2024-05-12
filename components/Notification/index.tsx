"use client";
import React from "react";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";

export default function Notification() {
  const message = notificationMessage((state) => state.notification);
  const setNotification = notificationState((state) => state.setNotification);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-[100vh] w-[100%] flex-col items-center  justify-center gap-5 bg-body-color bg-opacity-40 p-10 shadow-sticky backdrop-blur-sm dark:bg-opacity-20">
      <div className="flex flex-col gap-3 rounded-md bg-body-color bg-opacity-80 p-9 dark:bg-opacity-90">
        <p>{message}</p>
        <div className="flex w-full items-center  justify-center">
          <button
            onClick={() => setNotification(false)}
            className="flex items-center justify-center rounded-md bg-primary p-4 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp"
          >
            Ok!
          </button>
        </div>
      </div>
    </div>
  );
}
