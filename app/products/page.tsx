"use client";
import { useEffect, useState, Suspense } from "react";
import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import ProductCard from "@/components/ProductCards/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/allProducts`
        );

        if (!response.data) {
          throw new Error("No data received");
        }

        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <section className="flex justify-center overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className=" flex  w-full justify-center">
            <div className=" w-full ">
              <div className="flex justify-center ">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  All Products
                </h2>
              </div>
              <div className="flex justify-center">
                <SortFilter />
              </div>
              <div className="flex justify-center">
                <div className="my-10 flex w-[90vw] flex-wrap justify-around gap-y-12">
                  <Suspense fallback="dsdsadsad">
                    <ProductCard products={products} />
                  </Suspense>
                </div>
              </div>
              <div className="flex justify-center">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
