"use client";
import { cancelOrderAction } from "@/app/actions/cancelOrderAction";
import React from "react";

export default function StatusSelecter({ userId, id, status }) {
  const handleChange = (event) => {
    event.target.form.requestSubmit();
  };
  return (
    <form action={cancelOrderAction}>
      <input type="hidden" name="userId" value={String(userId)} readOnly />
      <input type="hidden" name="orderId" value={String(id)} readOnly />
      <span className="text-md">Status: </span>
      <select
        name="status"
        defaultValue={status}
        onChange={handleChange}
        className="border bg-body-color text-green"
      >
        <option value={"Shipped"}>{"Shipped"}</option>
        <option value={"Delivered"}>{"Delivered"}</option>
        <option value={"Pending"}>{"Pending"}</option>
      </select>
    </form>
  );
}
