import React from "react";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import mongoose from "mongoose";

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

export default async function ProductPage({
  params,
}: {
  params: { product: string };
}) {
  const data = await getProduct(params.product);

  return (
    <section className="flex justify-center overflow-hidden pt-[180px] pb-[120px]">
      <div className="container">
        <div className=" flex  w-full justify-center">
          <div className=" w-full ">
            <div className="flex justify-center ">
              <div className="h-80 w-[50%] bg-yellow"></div>
              <div className="h-80 w-[50%] bg-red">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {data.name}
                </h2>
              </div>
            </div>
            <div className="h-80 w-[100%] bg-gray"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
