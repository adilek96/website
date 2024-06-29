import Link from "next/link";
import React from "react";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { fetchOneProduct, fetchOrder } from "@/lib/data";
import { format } from "date-fns";
import Image from "next/image";

export default async function OrderItem({
  params,
}: {
  params: { order: string; id: string };
}) {
  const session = await getServerSession(authConfig);
  const orderId = params.id;
  let data = await fetchOrder({ session, orderId });

  const productArr = await Promise.all(
    data.items.map(async (item) => {
      const product = await fetchOneProduct(item.productId.toString());

      if (product === null) {
        return null;
      } else {
        return {
          ...product,
          quantity: item.quantity,
        };
      }
    })
  );
  console.log(productArr);
  return (
    <div className="flex h-full w-full flex-wrap justify-center   gap-8 ">
      <div className="self-stretch rounded-md bg-white p-8 shadow-2xl dark:bg-dark">
        <div>
          <span className="text-md">Order number: </span>
          <span>{String(data._id)}</span>
        </div>

        <div>
          <span className="text-md">Status: </span>
          <span
            className={data.status === "Canceled" ? "text-red" : "text-green"}
          >
            {data.status}
          </span>
        </div>
        <div>
          <span className="text-md">Payment method: </span>
          <span>{data.paymentMethod}</span>
        </div>
        <div>
          <span className="text-md">Order date: </span>
          <span>{format(new Date(data.orderDate), "dd-MM-yyyy HH:mm:ss")}</span>
        </div>

        {data.status === "Pending" ? (
          <form>
            <input
              type="hidden"
              name="orderId"
              value={String(data._id)}
              readOnly
            />
            <button className="ease-in-up text-md mt-2 rounded-md bg-primary px-3 py-1  font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp ">
              Cancel order
            </button>
          </form>
        ) : null}
      </div>

      <div className="self-stretch rounded-md bg-white p-8 shadow-2xl dark:bg-dark">
        <ul className="box-border flex h-[50%] w-full flex-col items-center gap-4 overflow-auto ">
          {productArr.map((item) => {
            if (item === null) {
              return (
                <li className="flex h-[100px] w-full cursor-pointer justify-between rounded-md bg-gray bg-opacity-30 p-4 shadow-lg hover:bg-opacity-50 dark:bg-modal dark:bg-opacity-60 dark:hover:bg-opacity-5"></li>
              );
            } else {
              return (
                <li
                  className="flex h-[100px] w-full cursor-pointer justify-between rounded-md bg-gray bg-opacity-30 p-4 shadow-lg hover:bg-opacity-50 dark:bg-modal dark:bg-opacity-60 dark:hover:bg-opacity-5"
                  key={item._id}
                >
                  <div className="flex  justify-start gap-2">
                    <div className="flex h-[90px] w-20 items-center">
                      <Image
                        className="h-[90px] w-20 object-cover "
                        src={item.image[0]}
                        alt="product image"
                        width={90}
                        height={90}
                      />
                    </div>
                    <p className="font-bold">
                      <Link href={`/products/${item.category}/${item._id}`}>
                        {item.name}
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-start font-bold">
                      $
                      {item.sale
                        ? item.salePrice * item.quantity
                        : item.price * item.quantity}
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
