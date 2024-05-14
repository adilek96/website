"use client";

import Link from "next/link";

const ProductCard = ({ products }: { products: any }) => {
  console.log(products);
  return (
    <>
      {products.map((items) => {
        return (
          <div
            key={items._id}
            className="bg-default relative w-[300px]  max-w-sm cursor-default rounded-lg bg-body-color bg-opacity-20 shadow-lg"
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
            <div className="mt-3 px-5 pb-5">
              <a href="#">
                <h5 className=" text-xl font-semibold tracking-tight ">
                  {items.name}
                </h5>
              </a>

              <div className="text-md mt-2 ">{items.category}</div>
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

                <button className="rounded-lg  bg-primary px-5 py-2.5 text-center text-sm font-medium transition-all duration-300 ease-in hover:opacity-80  ">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
