"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { shopModalState } from "@/store/shopModalState";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";
import { shopBagState } from "@/store/shoppingBagState";
import { totalPriceState } from "@/store/shoppingBagState";
import Link from "next/link";
import Image from "next/image";

export default function ShoppingCard() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  // const [userCart, setUserCart] = useState([]);
  const userCart = shopBagState((state) => state.userCart);
  const setUserCart = shopBagState((state) => state.setUserCart);
  const [isLoad, setIsLoad] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const totalPrice = totalPriceState((state) => state.totalPrice);
  const setTotalPrice = totalPriceState((state) => state.setTotalPrice);
  const [post, setPost] = useState(false);
  const shopModal = shopModalState((state) => state.shopModal);

  const getProductUseStorage = async (productArr) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/productStorage",
        {
          products: productArr,
        }
      );

      return response.data.products; // Возвращаем данные или обрабатываем результат запроса по необходимости
    } catch (error) {
      console.error("Error sending products to server:", error);
      return false; // Возвращаем false в случае ошибки
    }
  };

  // при авторизированном юзере
  const getUserShoppingBag = async () => {
    let productArr = JSON.parse(localStorage.getItem("productId")) || [];

    try {
      const response = await axios.post(
        `http://localhost:3000/api/productBag?email=${data.user.email}`,
        {
          products: productArr,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to add to cart");
      }

      localStorage.removeItem("productId");
      return response.data.products;
    } catch (error) {
      return false;
    }
  };

  const addItemInShoppingBag = async (productId) => {
    if (status === "authenticated") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/addToCart",
          {
            productId,
            userEmail: data.user.email,
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to add to cart");
        }
        setPost(true);
      } catch (error) {
        return false;
      }
    } else {
      let productArr = JSON.parse(localStorage.getItem("productId")) || [];

      // Найти продукт в массиве
      let productIndex = productArr.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        // Если продукт найден, увеличить количество
        productArr[productIndex].quantity += 1;
      } else {
        // Если продукт не найден, добавить новый объект продукта
        productArr.push({
          productId: productId,
          quantity: 1,
        });
      }

      localStorage.setItem("productId", JSON.stringify(productArr));
      setPost(true);
    }
  };

  const deleteItemInShoppingBag = async (productId) => {
    if (status === "authenticated") {
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
    } else {
      let productArr = JSON.parse(localStorage.getItem("productId")) || [];

      // Найти продукт в массиве
      let productIndex = productArr.findIndex(
        (item) => item.productId === productId
      );
      productArr[productIndex].quantity -= 1;
      if (productArr[productIndex].quantity === 0) {
        productArr.splice(productIndex, 1);
      }

      localStorage.setItem("productId", JSON.stringify(productArr));
      setPost(true);
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
    } else {
      // используем локал сторедж если юзер не авторизован
      const productArr = JSON.parse(localStorage.getItem("productId")) || [];
      getProductUseStorage(productArr).then((res) => {
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

  const purchaseHandle = () => {
    if (status === "authenticated") {
      router.push("/purchase");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="box-border flex h-[80vh] w-[90vw] flex-col items-center justify-center  md:w-[380px] ">
      <div className="box-border h-[20%]">
        <h2 className="my-5 text-center text-2xl font-bold">Shopping bag</h2>
      </div>

      {isLoad && userCart.length > 0 ? (
        <>
          <ul className="box-border flex h-[50%] w-full flex-col items-center gap-4 overflow-auto ">
            <Suspense fallback={<Loading />}>
              {userCart.map((item) => {
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
                      <div className="black:bg-black  h-8 rounded-md  bg-gray bg-opacity-30  p-1">
                        <button
                          type="button"
                          onClick={() => deleteItemInShoppingBag(item._id)}
                          className="font-bold text-yellow transition-all duration-500 hover:opacity-40"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold">{item.quantity}</span>
                        <button
                          type="button"
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
            </Suspense>
          </ul>

          <div className="mt-10 box-border flex h-[10%] w-full justify-between px-2 text-xl font-bold">
            <p>Total:</p>
            <p>${totalPrice}</p>
          </div>
          <div className="box-border h-[20%]">
            {pathname !== "/purchase" ? (
              <button
                onClick={purchaseHandle}
                className="my-10 flex items-center justify-center rounded-md bg-yellow px-6 py-2 font-bold  text-white  transition-all  duration-700  ease-in-out hover:bg-opacity-90 hover:shadow-signUp"
              >
                Get to Purchase
              </button>
            ) : (
              <div className="mb-5"></div>
            )}
          </div>
        </>
      ) : (
        <div className=" mb-10 flex h-[80%] w-full flex-col items-center justify-center ">
          You cart is empty...
        </div>
      )}
    </div>
  );
}
