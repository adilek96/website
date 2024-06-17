"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { shopModalState } from "@/store/shopModalState";

export default function ShoppingCard() {
  const { data, status } = useSession();
  const [userCart, setUserCart] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [post, setPost] = useState(false);
  const shopModal = shopModalState((state) => state.shopModal);

  const getUserShoppingBag = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/productBag?email=${data.user.email}`
      );

      return response.data.products;
    } catch (error) {
      return false;
    }
  };

  const addItemInShoppingBag = async (productId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/addToCart", {
        productId,
        userEmail: data.user.email,
      });

      if (response.status !== 200) {
        throw new Error("Failed to add to cart");
      }
      setPost(true);
    } catch (error) {
      return false;
    }
  };

  const deleteItemInShoppingBag = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/addToCart",
        {
          data: {
            productId,
            userEmail: data.user.email,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to add to cart");
      }
      setPost(true);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserShoppingBag().then((res) => {
        if (res === false) {
          setIsLoad(false);
        } else {
          // Calculate total price
          const price = res.reduce((acc, item) => {
            const itemPrice = item.sale ? item.salePrice : item.price;
            return acc + itemPrice * item.quantity;
          }, 0);
          setTotalPrice(price);
          setUserCart(res);
          setIsLoad(true);
          setPost(false);
        }
      });
    }
  }, [status, post, shopModal]);

  return (
    <div className="h-[80vh] w-[90vw] md:h-[500px] md:w-[380px] ">
      <h2 className="mt-5 text-center text-2xl font-bold">Shopping bag</h2>
      <div className="flex h-full w-full items-center justify-center ">
        {isLoad && userCart.length > 0 ? (
          <div className=" flex h-[90%] w-full flex-col items-center justify-between ">
            <div className="w-full">
              <ul className=" flex h-[250px] w-full flex-col items-center gap-4 overflow-auto ">
                {userCart.map((item) => {
                  return (
                    <li
                      className="flex h-[100px] w-full cursor-pointer justify-between rounded-md bg-gray bg-opacity-30 p-4 shadow-lg hover:bg-opacity-50 dark:bg-modal dark:bg-opacity-60 dark:hover:bg-opacity-5"
                      key={item._id}
                    >
                      <div className="flex  justify-start gap-2">
                        <div className="flex h-[90px] w-20 items-center">
                          <img
                            className="h-[90px] w-20"
                            src={item.image[0]}
                            alt="product image"
                            fill-content="true"
                          />
                        </div>
                        <p className="font-bold">{item.name}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="text-start font-bold">
                          $
                          {item.sale
                            ? item.salePrice * item.quantity
                            : item.price * item.quantity}
                        </div>
                        <div className="black:bg-black  h-8 rounded-md  bg-gray bg-opacity-30  p-1">
                          <button
                            onClick={() => deleteItemInShoppingBag(item._id)}
                            className="font-bold text-yellow transition-all duration-500 hover:opacity-40"
                          >
                            -
                          </button>
                          <span className="px-3 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              addItemInShoppingBag(item._id);
                            }}
                            className="font-bold text-yellow transition-all duration-500 hover:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex w-full justify-between px-2 text-xl font-bold">
              <p>Total:</p>
              <p>${totalPrice}</p>
            </div>
            <button className="mb-5 flex items-center justify-center rounded-md bg-yellow px-6 py-2 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp">
              Get to Purchase
            </button>
          </div>
        ) : (
          <p>You cart is empty...</p>
        )}
      </div>
    </div>
  );
}
