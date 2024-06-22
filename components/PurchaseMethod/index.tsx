"use client";
import React, { useState } from "react";

export default function PurchaseMethod() {
  const [method, setMethod] = useState();

  const radioHandler = (e) => {
    setMethod(e.target.name);
  };

  return (
    <div className="h-[80vh] w-[90vw] overflow-auto md:h-fit md:w-[380px] ">
      <h2 className="my-5 text-center text-2xl font-bold">
        Select payments method
      </h2>
      <div className="mt-10 flex flex-col items-center justify-center gap-5">
        <div
          className={`flex w-[200px] justify-around rounded-md ${
            method === "cashPay"
              ? "bg-yellow bg-opacity-90"
              : "bg-primary bg-opacity-50"
          }   p-5 text-xl`}
        >
          <label htmlFor="cashPay">Cash pay on shipment</label>
          <input
            onChange={(e) => radioHandler(e)}
            className="w-8"
            type="radio"
            name="cashPay"
            checked={method === "cashPay"}
            value="Cash on shipment"
          />
        </div>

        <div
          className={`flex w-[200px] justify-around rounded-md ${
            method === "cardPay"
              ? "bg-yellow bg-opacity-90"
              : "bg-primary bg-opacity-50"
          }  p-5 text-xl`}
        >
          <label htmlFor="cardPay">Card pay on shipment</label>
          <input
            onChange={(e) => radioHandler(e)}
            className="w-8"
            type="radio"
            name="cardPay"
            checked={method === "cardPay"}
            value="Card on shipment"
          />
        </div>
        <button
          type="submit"
          className="my-10 flex items-center justify-center rounded-md bg-yellow px-6 py-2 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
