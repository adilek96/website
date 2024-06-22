"use client";
import React, { Suspense } from "react";
import PurchaseAddress from "@/components/PurchaseAddress";
import PurchaseMethod from "@/components/PurchaseMethod";
import ShoppingCard from "@/components/ShoppingCard";
import { shopBagState } from "@/store/shoppingBagState";
import { totalPriceState } from "@/store/shoppingBagState";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import axios from "axios";

export default function PurchaseForm({ session, testAction }) {
  const totalPrice = totalPriceState((state) => state.totalPrice);
  const userCart = shopBagState((state) => state.userCart);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Process the form data
    try {
      await testAction(formData, totalPrice, userCart, session.user.id);
    } catch (error) {
      router.push("/error");
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const cashPay = formData.get("cashPay");
  //   const cardPay = formData.get("cardPay");
  //   const addressId = formData.get("addressId");
  //   const userId = session.user.id;
  //   // Process the form data
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/addOrder", {
  //       cashPay,
  //       cardPay,
  //       addressId,
  //       userCart,
  //       totalPrice,
  //       userId,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     router.push("/error");
  //   }
  // };

  if (userCart.length > 0) {
    return (
      <Suspense fallback={<Loading />}>
        <form
          onSubmit={handleSubmit}
          className=" flex h-full w-full flex-wrap justify-center   gap-8  "
        >
          <div className="self-stretch rounded-md bg-white p-8 shadow-2xl dark:bg-dark">
            <ShoppingCard />
          </div>

          <div className="self-stretch overflow-y-auto overflow-x-hidden rounded-md bg-white p-8 shadow-2xl dark:bg-dark">
            <PurchaseAddress session={session} />
          </div>

          <div className="self-stretch rounded-md bg-white p-8 shadow-2xl dark:bg-dark">
            <PurchaseMethod />
          </div>
        </form>
      </Suspense>
    );
  } else {
    return (
      <div className="flex h-[100vh] w-[100vw] items-center justify-center text-black dark:text-white">
        <p className="text-2xl font-bold">Please add product first!</p>
      </div>
    );
  }
}
