"use client";

import { useEffect, useState } from "react";
import {
  sortByState,
  selectedCategoryState,
  minPriceState,
  maxPriceState,
  brandState,
} from "@/store/sortingStore";
import axios from "axios";

const SortFilter = ({ data }) => {
  // submenu handler
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [submenu, setSubmenu] = useState([]);
  const [brand, setBrand] = useState([]);

  const selectedCategory = selectedCategoryState(
    (state) => state.selectedCategory
  );
  const setSelectedCategory = selectedCategoryState(
    (state) => state.setSelectedCategory
  );
  const selectedBrand = brandState((state) => state.selectedBrand);
  const setSelectedBrand = brandState((state) => state.setSelectedBrand);
  const sortBy = sortByState((state) => state.sortBy);
  const setSortBy = sortByState((state) => state.setSortBy);
  const minPrice = minPriceState((state) => state.minPrice);
  const setMinPrice = minPriceState((state) => state.setMinPrice);
  const maxPrice = maxPriceState((state) => state.maxPrice);
  const setMaxPrice = maxPriceState((state) => state.setMaxPrice);

  const selectedItem =
    data !== "All products" && submenu.find((item) => item.title === data);

  useEffect(() => {
    const fetchSubmenuData = async () => {
      try {
        const response = await axios.get("/api/category");
        const submenuData = response.data;

        setSubmenu(submenuData.data);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("/api/brands");
        const brands = response.data;

        setBrand(brands.data);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };

    fetchSubmenuData();
    fetchBrands();
  }, []);

  const openFilterHandler = () => {
    if (openFilter === false && openSort === true) {
      return setOpenFilter(true), setOpenSort(false);
    } else if (openFilter === false && openSort === false) {
      return setOpenFilter(true);
    } else if (openFilter === true && openSort === false) {
      return setOpenFilter(false);
    }
  };

  const openSortHandler = () => {
    if (openSort === false && openFilter === true) {
      return setOpenSort(true), setOpenFilter(false);
    } else if (openSort === false && openFilter === false) {
      return setOpenSort(true);
    } else if (openSort === true && openFilter === false) {
      return setOpenSort(false);
    }
  };

  return (
    <>
      <div className="mx-2 mb-6  h-fit w-[80%]   gap-3 rounded-sm py-3 dark:bg-primary dark:bg-opacity-5">
        <div className="flex justify-end">
          <button
            onClick={openSortHandler}
            className="mx-2 flex h-7 w-7 items-center justify-center rounded-lg hover:opacity-70 dark:hover:bg-modal"
          >
            <svg
              className="text-gray-800 h-6 w-6 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"
              />
            </svg>
          </button>

          <button
            onClick={openFilterHandler}
            className="flex h-7 w-7 items-center justify-center rounded-lg pr-2 hover:opacity-70 dark:hover:bg-modal"
          >
            <svg
              className="text-gray-800 h-6 w-6 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
              />
            </svg>
          </button>
        </div>
        <div className=" flex-wrapp flex w-[90%] items-center justify-end">
          <div
            className={` ${
              openSort ? "block" : "hidden"
            } mt-5 transition-all duration-300`}
          >
            <div className="flex  w-full snap-start flex-wrap items-center justify-center gap-3 pb-3">
              <p className="whitespace-nowrap pl-5">Sort by:</p>
              <select
                name="Sort"
                onChange={(e) => setSortBy(e.target.value)}
                defaultValue={String(sortBy)}
                className="w-[150px] rounded-md border border-transparent px-3 py-1 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
              >
                <option
                  value="DateDown"
                  className={sortBy === "DateDown" ? "text-yellow" : undefined}
                >
                  Date &#8595;
                </option>
                <option
                  value="DateUp"
                  className={sortBy === "DateUp" ? "text-yellow" : undefined}
                >
                  Date &#8593;
                </option>
                <option
                  value="Name"
                  className={sortBy === "Name" ? "text-yellow" : undefined}
                >
                  Name
                </option>
                <option
                  value="PriceUp"
                  className={sortBy === "PriceUp" ? "text-yellow" : undefined}
                >
                  Price &#8593;
                </option>
                <option
                  value="PriceDown"
                  className={sortBy === "PriceDown" ? "text-yellow" : undefined}
                >
                  Price &#8595;
                </option>
              </select>
            </div>
          </div>

          <div className={` ${openFilter ? "block" : "hidden"}`}>
            <div className="mb-5 ml-5 flex h-fit w-full snap-end flex-wrap items-center justify-center gap-3">
              <p className="whitespace-nowrap text-center ">Filter by:</p>
              {selectedItem ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <p className=" whitespace-nowrap  text-center text-sm">
                    Subcategory:
                  </p>
                  <select
                    name="category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    defaultValue={String(selectedCategory)}
                    className="w-[150px] rounded-md border border-transparent px-3 py-1 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                  >
                    <option value="All">All</option>
                    {selectedItem.submenu.map((sub, index) => (
                      <option
                        key={index}
                        value={sub.title}
                        className="whitespace-nowrap"
                      >
                        {sub.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <div className="flex flex-wrap items-center  justify-center gap-2 pr-5">
                <p className="  text-sm">Price:</p>
                <div className="flex  items-center justify-center">
                  <input
                    type="number"
                    id="minprice"
                    min={0}
                    value={+minPrice}
                    onChange={(e) => setMinPrice(+e.target.value)}
                    className="w-14 rounded-md bg-body-color pl-2 focus:bg-yellow"
                  />
                  <p className="px-2">-</p>
                  <input
                    type="number"
                    id="maxprice"
                    min={0}
                    value={+maxPrice}
                    onChange={(e) => setMaxPrice(+e.target.value)}
                    className="w-14 rounded-md bg-body-color pl-2 focus:bg-yellow"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <p className=" whitespace-nowrap  text-center text-sm">
                    Brand:
                  </p>
                  <select
                    name="brand"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    defaultValue={String(selectedBrand)}
                    className="w-[150px] rounded-md border border-transparent px-3 py-1 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                  >
                    <option value="All">All</option>
                    {brand.map((item, index) => (
                      <option
                        key={index}
                        value={item.name}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortFilter;
