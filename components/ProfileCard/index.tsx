"use client";
import React, { useState } from "react";
import { profileUpdateAction } from "@/app/actions/profileUpdateAction";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import Image from "next/image";
import Loading from "@/app/loading";

export default function ProfileCard({ user }) {
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const initialBirthday = user.birthday ? new Date(user.birthday) : "";

  const [image, setImage] = useState(user.image || "/images/user/user.svg");
  const [fullname, setFullname] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "+994");
  const [birthday, setBirthday] = useState(initialBirthday);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await profileUpdateAction(formData, user.id);

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

  if (!user) {
    return <Loading />;
  }
  return (
    <div>
      <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
        <Image
          className="h-32 object-cover object-center"
          src={image}
          alt="Woman looking front"
          width={320}
          height={320}
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
            id="fullname"
            autoComplete="name"
            value={fullname}
            placeholder="My name"
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
            id="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            readOnly
            className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
            id="phone"
            value={phone}
            autoComplete="tel"
            onChange={(e) => setPhone(e.target.value)}
            pattern="\+994\d{9}"
            placeholder="+994"
            className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
            id="birthday"
            autoComplete="off"
            placeholder="Birthday"
            max={maxDate}
            value={
              birthday instanceof Date
                ? birthday.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setBirthday(new Date(e.target.value))}
            className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <button
          type="submit"
          className="mb-16 flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Save
        </button>
      </form>
    </div>
  );
}
