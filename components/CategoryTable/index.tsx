"use client";

import { notificationState } from "@/store/notificationState";
import Notification from "@/components/Notification";
import { notificationMessage } from "@/store/notificationMessage";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import Link from "next/link";

export default function CategoryTable({ categories }) {
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );
  const deleteCategory = async (id: any) => {
    try {
      const response = await fetch("/api/category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      setNotification(true);
      setNotificationMessage(`${result.message}`);
      location.reload();
    } catch (error) {
      setNotification(true);
      setNotificationMessage("Ошибка при удалении категории");
      console.error("Ошибка при удалении категории", error);
    }
  };

  return (
    <div className="mt-5 px-4">
      <div className="relative flex flex-wrap justify-center gap-10 overflow-x-auto">
        {categories.data.map((item) => {
          return (
            <Link key={item._id} href={`/dashboard/categories/${item._id}`}>
              <div className="w-[250px] rounded-md bg-primary bg-opacity-10 p-5 shadow-md ">
                <div className=" flex flex-col gap-10 ">
                  <div>
                    <p>
                      <b>
                        <i>Title:</i>
                      </b>
                    </p>
                    <span className="font-bold text-primary">{item.title}</span>
                  </div>
                  <div className=" flex justify-end">
                    <button
                      onClick={() => {
                        deleteCategory(item._id);
                      }}
                    >
                      <DeleteSvg />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
