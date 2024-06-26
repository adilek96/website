"use client";
import { Suspense, useEffect, useState, lazy } from "react";
import Loading from "../loading";
import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import axios from "axios";
import { paginationState } from "@/store/paginationStore";
import {
  sortByState,
  selectedCategoryState,
  minPriceState,
  maxPriceState,
} from "@/store/sortingStore";
// Lazy load the ProductCard component
const ProductCard = lazy(() => import("@/components/ProductCards/ProductCard"));

export default function Products({ params }) {
  const currentPage = paginationState((state) => state.currentPage);
  const [totalCount, setTotalCount] = useState(1);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedCategory = selectedCategoryState(
    (state) => state.selectedCategory
  );
  const sortBy = sortByState((state) => state.sortBy);
  const minPrice = minPriceState((state) => state.minPrice);
  const maxPrice = maxPriceState((state) => state.maxPrice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/allProducts?subcategory=${selectedCategory}&sortby=${sortBy}&minprice=${minPrice}&maxprice=${maxPrice}&page=${currentPage}`
        );

        if (!response.data.data) {
          throw new Error("No data received");
        }
        setTotalCount(response.data.totalCount);
        setProducts(response.data.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, sortBy, minPrice, maxPrice]);

  return (
    <>
      <section className="flex justify-center overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className=" flex  w-full justify-center">
            <div className=" w-full ">
              <div className="flex justify-center ">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  All products
                </h2>
              </div>
              <div className="flex justify-center">
                <SortFilter data={products} />
              </div>
              <div className="flex justify-center">
                <div className="my-10 flex w-[90vw] flex-wrap justify-around gap-y-12">
                  {error ? (
                    <h3>Failed to load products. Please try again.</h3>
                  ) : (
                    <>
                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          {!products || products.length === 0 ? (
                            <h3>Products in this category do not exist.</h3>
                          ) : (
                            <Suspense fallback={<Loading />}>
                              <ProductCard products={products} />
                            </Suspense>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Pagination totalCount={totalCount} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
