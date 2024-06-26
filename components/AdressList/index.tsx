"use client";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import Link from "next/link";
import Loading from "@/app/loading";
import AddressCard from "../AddressCard";

export default function AddressList({ session }) {
  const [addresses, setAddresses] = useState([]);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );
  const notification = notificationState((state) => state.notification);
  const [loading, setLoading] = useState(true);

  const bgcolor = "bg-primary bg-opacity-20";

  useEffect(() => {
    fetchData();
  }, [notification]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getAdress?id=${session.user.id}`);
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    const userId = session.user.id;
    const addressId = id;

    try {
      const response = await axios.delete(
        `/api/getAdress?userId=${userId}&addressId=${addressId}`
      );
      setAddresses(response.data);
      setNotification(true);
      setNotificationMessage(`Address is delete.`);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {addresses.length === 0 ? (
        <div className="mx-10 my-10 flex  flex-col items-center justify-center">
          <p className="text-xl font-bold italic">
            You don&apos;t have any addresses. Please add them.
          </p>
          <button className="my-8 flex w-[180px] items-center justify-center rounded-md bg-primary px-3 py-2 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
            Add address
          </button>
        </div>
      ) : (
        <div className="mx-10 my-10 flex max-w-full flex-wrap items-center justify-start gap-5 ">
          <Suspense fallback={<Loading />}>
            {addresses.map((item) => (
              <div key={item._id} className="relative">
                <Link href={`/profile/adress/${item._id}`}>
                  <AddressCard item={item} bgcolor={bgcolor} />
                </Link>
                <button
                  className=" absolute bottom-4 right-4 flex justify-end opacity-60 hover:opacity-100"
                  onClick={() => deleteHandler(item._id)}
                >
                  <DeleteSvg />
                </button>
              </div>
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
}
