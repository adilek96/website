"use client";
import React, { useState } from "react";
import { profileUpdateAction } from "@/app/action/profileUpdateAction";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";

export default function ProfileCard({ session }) {
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const initialBirthday = session.user.birthday
    ? new Date(session.user.birthday)
    : "";

  const [image, setImage] = useState(
    session.user.image || "/images/user/user.svg"
  );
  const [fullname, setFullname] = useState(session.user.name);
  const [email, setEmail] = useState(session.user.email);
  const [phone, setPhone] = useState(session.user.phone || "+994");
  const [birthday, setBirthday] = useState(initialBirthday);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await profileUpdateAction(formData, session.user.id);

      setNotificationMessage("Profile has up to date!");
    } catch (error) {
      setNotificationMessage("Somthing wrong, please try later!");
    } finally {
      setNotification(true);
    }
  };

  // Calculate max date as today's date
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  return (
    <div>
      <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
        <img
          className="h-32 object-cover object-center"
          src={image}
          alt="Woman looking front"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="fullname"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            placeholder="My name"
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="email"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            readOnly
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="phone"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="\+994\d{9}"
            placeholder="+994"
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="birthday"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Date of birth
          </label>
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            max={maxDate}
            value={
              birthday instanceof Date
                ? birthday.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setBirthday(new Date(e.target.value))}
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <button
          type="submit"
          className="mb-16 flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Save
        </button>
      </form>
    </div>
  );
}