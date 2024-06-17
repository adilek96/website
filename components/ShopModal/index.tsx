"use client";
import React from "react";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import { shopModalState } from "@/store/shopModalState";

export default function ShopModal() {
  const message = notificationMessage((state) => state.notificationMessage);
  const setNotification = notificationState((state) => state.setNotification);
  const shopModal = shopModalState((state) => state.shopModal);
  const setShopModal = shopModalState((state) => state.setShopModal);

  if (shopModal) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex h-[100vh] w-[100%] flex-col items-center  justify-center gap-5 bg-body-color bg-opacity-40 p-10 shadow-sticky backdrop-blur-sm dark:bg-opacity-20">
        <div className="flex flex-col gap-3 rounded-md bg-body-color bg-opacity-80 p-9 dark:bg-opacity-90">
          <p className="text-2xl font-bold">{message}</p>
          <div className="mt-8 flex w-full items-center  justify-center gap-5">
            <button
              onClick={() => (setShopModal(false), setNotification(false))}
              className="flex items-center justify-center rounded-md bg-primary p-3 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp"
            >
              Get a shop
            </button>
            <button
              onClick={() => (setShopModal(false), setNotification(false))}
              className="flex items-center justify-center rounded-md bg-primary p-3 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp"
            >
              Buy now!
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
