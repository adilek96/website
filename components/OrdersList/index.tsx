import React from "react";
import { format } from "date-fns";
import Link from "next/link";

export default function OrdersList({ data }) {
  return (
    <div className="m-10  flex h-fit w-full cursor-default flex-wrap justify-center gap-5  text-xs">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="m-5 h-fit w-[320px] rounded-md bg-body-color  p-5 shadow-2xl"
          >
            <div>
              <span className="text-md">Order number: </span>
              <span>{item._id}</span>
            </div>

            <div>
              <span className="text-md">Status: </span>
              <span
                className={
                  item.status === "Canceled" ? "text-red" : "text-green"
                }
              >
                {item.status}
              </span>
            </div>
            <div>
              <span className="text-md">Payment method: </span>
              <span>{item.paymentMethod}</span>
            </div>
            <div>
              <span className="text-md">Order date: </span>
              <span>
                {format(new Date(item.orderDate), "dd-MM-yyyy HH:mm:ss")}
              </span>
            </div>

            {item.status === "Pending" ? (
              <form>
                <input
                  type="hidden"
                  name="orderId"
                  value={String(item._id)}
                  readOnly
                />
                <button className="ease-in-up text-md mt-2 rounded-md bg-primary px-3 py-1  font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp ">
                  Cancel order
                </button>
              </form>
            ) : null}
            <div className="text-md mt-2 flex justify-center">
              <Link href={`/profile/orders/${item.status}/${item._id}`}>
                <div className="transition duration-300 hover:opacity-60">
                  <p>See products</p>
                  <p className="text-center">ᐁ</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
