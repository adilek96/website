import React from "react";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import mongoose from "mongoose";
import Link from "next/link";
import ImageSwiper from "@/components/ImageSwiper";
import Accordion from "@/components/Accordion";

async function getProduct(id) {
  await connectMongoDB();

  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await Product.findOne({ _id: objectId });
    if (!data) {
      throw new Error("Product not found");
    }

    // Преобразуем _id в строку и даты в ISO строку
    const plainData = {
      ...data._doc, // если используется mongoose, иначе data.toObject()
      _id: data._id.toString(),
      createdAt: data.createdAt ? data.createdAt.toISOString() : null,
      updatedAt: data.updatedAt ? data.updatedAt.toISOString() : null,
    };

    return plainData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load product");
  }
}

export default async function ProductPage({ params }) {
  let data;

  try {
    data = await getProduct(params.product);
  } catch (error) {
    return (
      <div className="flex justify-center pt-[180px] pb-[120px]">
        <div className="container text-center">
          <h1 className="text-red-600 text-3xl font-bold">Error</h1>
          <p className="text-lg">
            Failed to load product. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex justify-center overflow-hidden pt-[180px] pb-[120px]">
      <div className="container">
        <div className="flex w-full justify-center">
          <div className="w-full">
            <div className="flex flex-wrap justify-center">
              <div className="h-[500px] w-[300px] sm:w-[50%]">
                <div className=" w-[95%]">
                  <ImageSwiper images={data.image} />
                </div>
              </div>
              <div className="h-80 w-[300px] sm:w-[50%]">
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {data.name}
                </h1>
                <div>
                  <Link
                    href={`/products/${data.category
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                  >
                    {data.category}
                  </Link>
                  <span className="text-yellow">
                    {data.subcategory ? ` / ${data.subcategory}` : null}
                  </span>
                </div>
                <div className="mt-12">
                  <div>
                    {data.sale && (
                      <span className="text-3xl font-bold text-red">
                        ${data.salePrice}
                      </span>
                    )}
                    <span
                      className={`${
                        data.sale
                          ? "text-lg text-gray line-through"
                          : "text-3xl"
                      } font-bold`}
                    >
                      {` $${data.price}`}
                    </span>
                  </div>
                  <div className="mt-5 flex gap-5">
                    <button className="rounded-lg bg-primary px-5 py-2.5 text-center text-lg font-medium transition-all duration-300 ease-in hover:opacity-80">
                      Add to cart
                    </button>
                    <button className="rounded-lg bg-yellow px-5 py-2.5 text-center text-lg font-medium transition-all duration-300 ease-in hover:opacity-80">
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-[100%] rounded-sm bg-body-color bg-opacity-20 px-5 py-10 dark:bg-primary dark:bg-opacity-10">
              <div className="mb-10 ">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Description
                </h2>
                {data.description}
              </div>

              <Accordion data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
