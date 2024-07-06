"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import menuData from "@/components/Header/menuData";
import { Menu } from "@/types/menu";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import AddButton from "@/components/AddButton";
import Link from "next/link";

export default function AddProduct() {
  const [sub, setSub] = useState(false);
  const [sale, setSale] = useState<boolean>(false);
  const [subMenu, setSubmenu] = useState([]);
  const [menu, setMenu] = useState<Menu[]>(menuData);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const router = useRouter();

  // получение категорий

  useEffect(() => {
    const fetchSubmenuData = async () => {
      try {
        const response = await axios.get("/api/category");
        const submenuData = response.data;

        // Обновление подкатегорий в разделе "Products"
        const updatedMenu = menu.map((item) => {
          if (item.title === "Products") {
            return {
              ...item,
              submenu: Array.isArray(submenuData.data) ? submenuData.data : [],
            };
          }
          return item;
        });

        setMenu(updatedMenu);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };

    fetchSubmenuData();
  }, []);

  const categoryHandler = (e) => {
    const selectedValue = e.target.value;
    const selectedCategoryObj = menu[1].submenu.find(
      (category) => category.title === selectedValue
    );

    if (selectedCategoryObj && selectedCategoryObj.submenu.length > 0) {
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
    const salePrice = e.target.salePrice.value as number;

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
        const response = await fetch("/api/product", {
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
            sale,
            salePrice,
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
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/products"}>
          <AddButton buttonText={"Back"} />
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px]">Add product</h1>
      <form onSubmit={handleSubmit} className="mb-10 mt-10 w-[90%]">
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
              className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
                required
                className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                onChange={categoryHandler}
              >
                {menu[1].submenu.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            {subMenu.length > 0 && sub ? (
              <div className="mb-8">
                <label
                  htmlFor="subcategory"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Product subcategory
                </label>
                <select
                  name="subcategory"
                  required
                  className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
                >
                  {subMenu.map((subcategory) => {
                    return subcategory.map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ));
                  })}
                </select>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-8">
          <label
            htmlFor="description"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Product description
          </label>

          <textarea
            name="description"
            placeholder="Enter description"
            required
            className="h-[200px] w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="characteristics"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Product characteristics
          </label>
          <textarea
            name="characteristics"
            placeholder="Enter product characteristics"
            required
            className="h-[200px] w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
              min={0}
              required
              className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
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
              className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            />
          </div>
        </div>
        <div className=" flex justify-between">
          <div className="mb-8">
            <label
              htmlFor="isSale"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product is sale?
            </label>
            <input
              onClick={() => setSale(!sale)}
              name="isSale"
              type="checkbox"
              className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="sale-price"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product sale price
            </label>
            <input
              type="number"
              name="salePrice"
              placeholder="Enter sale price"
              min={0}
              className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
              disabled={!sale}
            />
          </div>
        </div>

        {/* {error && (
                    <div className="mb-8 flex w-full flex-col justify-between rounded-md border border-transparent bg-yellow sm:flex-row sm:items-center">
                      <p className="p-4">{error}</p>
                    </div>
                  )} */}

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Add product
        </button>
      </form>
    </section>
  );
}
