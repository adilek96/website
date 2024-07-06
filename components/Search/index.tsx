"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function Search({ setSearchOpen }) {
  const [data, setData] = useState([]);

  async function searchHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("default-search") as string;

    if (!searchTerm) {
      setData(["Введите запрос для поиска"]);

      return;
    }

    try {
      const response = await axios.get(`/api/search?term=${searchTerm}`);
      setData(response.data.products);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  return (
    <div className="mx-auto w-[95%]">
      <form onSubmit={searchHandler}>
        <label
          htmlFor="default-search"
          className=" sr-only mb-2 text-sm font-medium "
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="  h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            name="default-search"
            id="default-search"
            className="  w-full rounded-lg border bg-white p-4 ps-10 text-sm shadow-2xl dark:bg-dark dark:text-white"
            placeholder="Search products..."
          />
          <button className="absolute bottom-2.5 end-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white ">
            Search
          </button>
        </div>
      </form>
      {data.length > 0 ? (
        <div className="w-full bg-white/90 px-10 py-10 dark:bg-dark/90">
          <ul className="flex flex-col gap-3 font-bold">
            {data.map((item, i) => {
              return (
                <li
                  onClick={() => setSearchOpen(false)}
                  className="cursor-pointer hover:text-opacity-60"
                  key={i}
                >
                  {item.name ? (
                    <Link href={`/products/${item.category}/${item._id}`}>
                      {item.name}
                    </Link>
                  ) : (
                    item
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
