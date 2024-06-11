"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import menuData from "@/components/Header/menuData";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { notificationState } from "@/store/notificationState";
import Notification from "@/components/Notification";
import { notificationMessage } from "@/store/notificationMessage";

export default function AddProduct() {
  const [sub, setSub] = useState(false);
  const [submenu, setSubmenu] = useState([]);
  const notification = notificationState((state) => state.notification);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const router = useRouter();

  const categoryHandler = (e) => {
    const selectedValue = e.target.value;
    const selectedCategoryObj = menuData[1].submenu.find(
      (category) => category.title === selectedValue
    );

    if (selectedCategoryObj && selectedCategoryObj.submenu) {
      setSub(true);
      setSubmenu([selectedCategoryObj.submenu]);
    } else {
      setSub(false);
      setSubmenu([]);
    }
  };

  ////image handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value as string;
    const category = e.target.category.value as string;
    const subcategory =
      e.target.subcategory === undefined
        ? ""
        : (e.target.subcategory.value as string);
    const description = e.target.description.value as string;
    const characteristics = e.target.characteristics.value;
    const price = e.target.price.value as number;
    const productImage = e.target.image.files;
    const image = [];

    if (productImage === undefined) return console.log("error image uploads");

    // Загрузка изображений и ожидание их завершения
    await Promise.all(
      Object.keys(productImage).map(async (key) => {
        const img = productImage[key];
        const storageRef = ref(storage, `product/${name}/${img.name}`);

        const uploadTask = uploadBytesResumable(storageRef, img);
        // Ожидание загрузки изображения
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Обработка прогресса загрузки, если необходимо
            },
            (error) => {
              reject(error); // Ошибка при загрузке изображения
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  image.push(downloadURL); // Добавление URL в массив
                  resolve(); // Завершение промиса после успешной загрузки изображения
                })
                .catch((error) => {
                  reject(error); // Ошибка при получении URL изображения
                });
            }
          );
        });
      })
    );

    // После завершения всех загрузок изображений
    if (image.length === Object.keys(productImage).length) {
      console.log("All images uploaded successfully");

      try {
        // Отправка запроса POST для добавления продукта
        const response = await fetch("http://localhost:3000/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            characteristics,
            description,
            image,
            category,
            subcategory,
            price,
          }),
        });

        if (response.ok) {
          setNotification(true);
          setNotificationMessage("Product added successfully");
          location.reload();
        } else {
          setNotification(true);
          setNotificationMessage("Failed to add product");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setNotification(true);
      setNotificationMessage("Error uploading images");
    }
  };

  return (
    <section className=" flex flex-col items-center justify-center">
      {notification ? <Notification /> : ""}

      <div className="flex w-[90%] justify-start">
        <button
          onClick={() => {
            router.push("/dashboard/products");
          }}
          className=" flex w-11  items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Back
        </button>
      </div>
      <h1 className="mt-5 text-center text-[30px]">Add product</h1>
      <form onSubmit={handleSubmit} className="mt-10 mb-10 w-[90%]">
        <div className=" flex gap-5">
          <div className="mb-8">
            <label
              htmlFor="name"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              required
              className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            />
          </div>
          <div>
            <div className="mb-8">
              <label
                htmlFor="category"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Product category
              </label>
              <select
                name="category"
                placeholder="Select category"
                required
                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                onChange={categoryHandler}
              >
                {menuData[1].submenu.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            {sub && (
              <div className="mb-8">
                <label
                  htmlFor="subcategory"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Product category
                </label>
                <select
                  name="subcategory"
                  placeholder="Select subcategory"
                  required
                  className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                >
                  {submenu.map((subcategory) => {
                    return subcategory.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ));
                  })}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <label
            htmlFor="description"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Product description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            required
            className="h-[200px] w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="characteristics"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Product characteristics
          </label>
          <input
            type="text"
            name="characteristics"
            placeholder="Enter product characteristics"
            required
            className="h-[200px] w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className=" flex justify-between">
          <div className="mb-8">
            <label
              htmlFor="price"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              required
              className=" w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="image"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Enter product image"
              multiple
              required
              className=" w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Add product
        </button>
      </form>
    </section>
  );
}
