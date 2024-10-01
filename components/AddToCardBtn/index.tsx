"use client";
import { notificationMessage } from "@/store/notificationMessage";
import { notificationState } from "@/store/notificationState";
import { shopModalState } from "@/store/shopModalState";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

export default function AddToCardBtn({ productId }) {
  const { data, status } = useSession();
  console.log(status);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );
  const setShopModal = shopModalState((state) => state.setShopModal);

  const addToCart = async (id, userEmail) => {
    try {
      const response = await axios.post("/api/addToCart", {
        productId,
        userEmail,
      });

      if (response.status !== 200) {
        throw new Error("Failed to add to cart");
      }

      return (
        setShopModal(true), setNotificationMessage("Product added to cart")
      );
    } catch (error) {
      return (
        setNotification(true),
        setNotificationMessage("Somthing wrong, try its later")
      );
    }
  };

  const addHandler = (e) => {
    const value = e.target.getAttribute("data-value");

    if (data === null && status === "unauthenticated") {
      let productArr = JSON.parse(localStorage.getItem("productId")) || [];

      // Найти продукт в массиве
      let productIndex = productArr.findIndex(
        (item) => item.productId === value
      );

      if (productIndex !== -1) {
        // Если продукт найден, увеличить количество
        productArr[productIndex].quantity += 1;
      } else {
        // Если продукт не найден, добавить новый объект продукта
        productArr.push({
          productId: value,
          quantity: 1,
        });
      }

      localStorage.setItem("productId", JSON.stringify(productArr));
      setShopModal(true), setNotificationMessage("Product added to cart");
    } else {
      addToCart(value, data.user.email);
    }
  };
  return (
    <>
      <button
        onClick={(e) => addHandler(e)}
        data-value={productId}
        className="rounded-lg bg-primary px-5 py-2.5 text-center text-lg font-medium transition-all duration-300 ease-in hover:opacity-80"
      >
        Add to cart
      </button>
    </>
  );
}
