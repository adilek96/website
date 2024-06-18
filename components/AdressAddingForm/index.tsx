"use client";
import React, { useState } from "react";
import { profileUpdateAction } from "@/app/action/profileUpdateAction";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";

export default function AdressAddingForm({ session }) {
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Azerbaijan");
  const [state, setState] = useState("");

  return (
    <div className="mt-10">
      <form>
        <div className="mb-8">
          <label
            htmlFor="country"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            readOnly
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="city"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="state"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            value={state}
            placeholder="State"
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="street"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Street
          </label>
          <input
            type="text"
            name="street"
            value={street}
            placeholder="Street"
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <button
          type="submit"
          className="mb-16 flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Add
        </button>
      </form>
    </div>
  );
}
