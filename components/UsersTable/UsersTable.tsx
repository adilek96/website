"use client";
import { signIn, useSession } from "next-auth/react";
import { notificationState } from "@/store/notificationState";
import Notification from "@/components/Notification";
import { notificationMessage } from "@/store/notificationMessage";

export default function UsersTable({ users }) {
  const notification = notificationState((state) => state.notification);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );
  const session = useSession();

  const deleteUser = async (email: any) => {
    if (email === session.data.user.email) {
      return false;
    }
    try {
      const response = await fetch("/api/allUsers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
      setNotificationMessage("Ошибка при удалении пользователя");
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  return (
    <div className="mt-5 px-4">
      {notification ? <Notification /> : ""}
      <div className="relative overflow-x-auto">
        <table className=" w-full text-left text-sm rtl:text-right">
          <thead className="  text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Create Date
              </th>
              <th scope="col" className="px-6 py-3">
                Update Date
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user: any) => (
              <tr key={user.email} className=" border-b">
                <th
                  scope="row"
                  className=" whitespace-nowrap px-6 py-4 font-medium "
                >
                  {user.email}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.createdAt}</td>
                <td className="px-6 py-4">{user.createdAt}</td>
                <td
                  onClick={(e) => deleteUser(user.email)}
                  className="cursor-pointer px-6 py-4"
                >
                  <svg
                    className="h-6 w-6 text-red "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
