import { updateTicketsAction } from "@/app/actions/updateTicketsAction";
import React from "react";

export default function TicketCard({ item, page }) {
  return (
    <form
      action={updateTicketsAction}
      className=" flex w-[300px] flex-col items-center justify-center gap-3 rounded-md bg-body-color bg-opacity-50 p-10"
    >
      <div className="flex w-full justify-between ">
        <p className="font-bold ">From:</p>
        <p>{item.tname}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="font-bold ">Contact number:</p>
        <p>{item.phone}</p>
      </div>

      <div className="flex w-full justify-between">
        <p className="font-bold ">Service type:</p>
        <p>{item.type}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="font-bold ">Message:</p>
        <p>{item.message}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="font-bold text-green ">Create date:</p>
        <p>{item.createDate}</p>
      </div>
      <input
        type="hidden"
        name="ticketId"
        id="ticketId"
        readOnly
        defaultValue={item._id}
      />
      {item.status === "Processing" && page === "Dashboard" ? (
        <div className="flex w-full items-center justify-end">
          <button className="rounded-md bg-green px-4 py-2 text-center text-[14px] text-white">
            Close ticket
          </button>
        </div>
      ) : null}
    </form>
  );
}
