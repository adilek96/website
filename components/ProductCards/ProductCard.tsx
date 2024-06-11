"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProductCard({ products }: { products: any }) {
  const { data, status } = useSession();

  const addToCart = async (productId, userEmail) => {
    try {
      const response = await axios.post("http://localhost:3000/api/addToCart", {
        productId,
        userEmail,
      });

      if (response.status !== 200) {
        throw new Error("Failed to add to cart");
      }

      console.log("Product added to cart");
    } catch (error) {
      console.error(error);
    }
  };

  const addHandler = (e) => {
    const value = e.target.getAttribute("data-value");
    console.log(data.user.email);

    if (data === null && status === "unauthenticated") {
      localStorage.setItem("productId", value);
    } else {
      addToCart(value, data.user.email);
    }
  };
  return (
    <>
      {products.map((items) => {
        return (
          <div
            key={items._id}
            className="bg-default relative w-[300px]  max-w-sm cursor-default rounded-lg bg-body-color bg-opacity-20 shadow-lg"
          >
            <Link
              href={`/products/${items.category
                .toLowerCase()
                .replace(/ /g, "-")}/${items._id}`}
            >
              <div>
                {items.sale && (
                  <div className=" absolute right-[-11px] top-[-11px]">
                    <img
                      className="h-[100px] w-full object-fill  "
                      src="/images/sale/sale.svg"
                      alt="product image"
                    />
                  </div>
                )}

                <img
                  className="h-[160px] w-full rounded-t-lg object-cover p-1"
                  src={`${items.image[0]}`}
                  alt="product image"
                />
              </div>
            </Link>
            <div className="mt-3 px-5 pb-5">
              <Link
                href={`/products/${items.category
                  .toLowerCase()
                  .replace(/ /g, "-")}/${items._id}`}
              >
                <h5 className=" text-xl font-semibold tracking-tight ">
                  {items.name}
                </h5>
              </Link>

              <div className="text-md mt-2 ">
                {" "}
                <Link
                  href={`/products/${items.category
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  {items.category}{" "}
                </Link>
              </div>
              <div className="mb-5 h-4 text-xs text-yellow">
                {items.subcategory}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {items.sale && (
                    <span className=" text-2xl font-bold text-red ">
                      ${items.salePrice}
                    </span>
                  )}
                  <span
                    className={`${
                      items.sale ? "text-lg text-gray line-through" : "text-2xl"
                    }  font-bold`}
                  >
                    {` $${items.price}`}
                  </span>
                </div>

                <button
                  onClick={(e) => addHandler(e)}
                  data-value={items._id}
                  className="rounded-lg  bg-primary px-5 py-2.5 text-center text-sm font-medium transition-all duration-300 ease-in hover:opacity-80  "
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
