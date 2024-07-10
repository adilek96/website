"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import menuData from "@/components/Header/menuData";
import { Menu } from "@/types/menu";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import AddButton from "@/components/AddButton";
import Link from "next/link";

export default function UpdateProduct({
  params,
}: {
  params: { updateProduct: string };
}) {
  const [sub, setSub] = useState(false);
  const [sale, setSale] = useState<boolean>(false);
  const [subMenu, setSubmenu] = useState([]);
  const [menu, setMenu] = useState<Menu[]>(menuData);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [characteristics, setCharacteristics] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [fetchImage, setFetchImage] = useState([]);
  const [salePrice, setSalePrice] = useState<number>(0);
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

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

    const fetchBrands = async () => {
      try {
        const response = await axios.get("/api/brands");
        const brandData = response.data.data;

        setBrands(brandData);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };
    fetchBrands();

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/product?id=${params.updateProduct}`
        );

        setCharacteristics(response.data.data.characteristics || "");
        setCategory(response.data.data.category || "");
        setSubcategory(response.data.data.subcategory || "");
        setDescription(response.data.data.description || "");
        setBrand(response.data.data.brand || "");
        setPrice(response.data.data.price || 0);
        setSalePrice(response.data.data.salePrice || 0);
        setSale(response.data.data.sale || false);
        setTitle(response.data.data.name || "");
        setFetchImage(response.data.data.image || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const categoryHandler = (e) => {
    setCategory(e.target.value);
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

    const productImage = e.target.image.files;
    const uploadedImageUrls = [];

    if (!productImage) return console.error("Error: No images to upload");

    try {
      // Загрузка каждого изображения
      await Promise.all(
        Object.keys(productImage).map(async (key) => {
          const img = productImage[key];
          const storageRef = ref(storage, `product/${name}/${img.name}`);

          const uploadTask = uploadBytesResumable(storageRef, img);

          // Ожидание завершения загрузки изображения
          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Отслеживание прогресса загрузки, если нужно
              },
              (error) => {
                console.error("Error uploading image:", error);
                reject(error);
              },
              () => {
                // Загрузка завершена успешно
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    uploadedImageUrls.push(downloadURL); // Добавление URL в массив
                    resolve();
                  })
                  .catch((error) => {
                    console.error("Error getting download URL:", error);
                    reject(error);
                  });
              }
            );
          });
        })
      );

      // После завершения всех загрузок изображений
      setFetchImage([...fetchImage, ...uploadedImageUrls]); // Обновление состояния fetchImage

      // Отправка данных продукта после загрузки изображений
      const response = await fetch("/api/productUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.updateProduct,
          name: title,
          characteristics,
          description,
          image: [...fetchImage, ...uploadedImageUrls], // Используем обновленный массив fetchImage
          category,
          subcategory,
          price,
          sale,
          salePrice,
          brand,
        }),
      });

      if (response.ok) {
        setNotification(true);
        setNotificationMessage("Product updated successfully");
        location.reload();
      } else {
        setNotification(true);
        setNotificationMessage("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setNotification(true);
      setNotificationMessage("Error updating product");
    }
  };

  return (
    <section className=" flex flex-col items-center justify-center">
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/products"}>
          <AddButton buttonText={"Back"} />
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px]">Update product</h1>
      <form onSubmit={handleSubmit} className="mb-10 mt-10 w-[90%]">
        <div className=" flex flex-wrap gap-5">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                value={category}
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
                  onChange={(e) => setSubcategory(e.target.value)}
                  value={subcategory}
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
          <div className="mb-8">
            <label
              htmlFor="brand"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Product brand
            </label>
            <select
              name="brand"
              required
              className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={characteristics}
            onChange={(e) => setCharacteristics(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
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
              type="checkbox"
              name="sale"
              checked={sale}
              onChange={(e) => setSale(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary"
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
              value={salePrice}
              onChange={(e) => setSalePrice(+e.target.value)}
              className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
              disabled={!sale}
            />
          </div>
        </div>

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
