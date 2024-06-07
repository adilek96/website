import React from "react";

export default function CategoryForm({ CategoryAddingAction }: any) {
  return (
    <form action={CategoryAddingAction}>
      <label
        htmlFor="title"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter category title"
        required
        className="mb-3w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="path"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Path
      </label>
      <input
        type="text"
        name="path"
        id="path"
        placeholder="Enter category path"
        required
        className=" mb-3 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      />
      <label
        htmlFor="newtab"
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
      >
        Open this in newtab?
      </label>
      <select
        name="newtab"
        id="newtab"
        required
        className="mb-5 w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
      >
        <option value={"false"}>No</option>
        <option value={"true"}>Yes</option>
      </select>

      <button
        type="submit"
        className=" flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
      >
        Add category
      </button>
    </form>
  );
}
