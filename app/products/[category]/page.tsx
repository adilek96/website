"use client";
import { Suspense, useEffect, useState, lazy } from "react";
import Loading from "../../loading";
import SortFilter from "@/components/SortFilter/SortFilter";
import Pagination from "@/components/Pagination/Pagination";
import axios from "axios";
import menuData from "@/components/Header/menuData";
import { paginationState } from "@/store/paginationStore";
import { useRouter } from "next/navigation";
import {
  sortByState,
  selectedCategoryState,
  minPriceState,
  maxPriceState,
} from "@/store/sortingStore";
import { Menu } from "@/types/menu";

// Ленивая загрузка компонента карточки продукта
const ProductCard = lazy(() => import("@/components/ProductCards/ProductCard"));

export default function Products({ params }: { params: { category: string } }) {
  const currentPage = paginationState((state) => state.currentPage);
  const selectedCategory = selectedCategoryState(
    (state) => state.selectedCategory
  );
  const [menu, setMenu] = useState<Menu[]>(menuData);
  const [totalCount, setTotalCount] = useState(1);
  const sortBy = sortByState((state) => state.sortBy);
  const minPrice = minPriceState((state) => state.minPrice);
  const maxPrice = maxPriceState((state) => state.maxPrice);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [menuLoader, setMenuLoader] = useState(false);
  const router = useRouter();

  // Получаем массив субкатегории и записываем в стейт

  useEffect(() => {
    const fetchSubmenuData = async () => {
      try {
        const response = await axios.get("/api/category");
        const submenuData = response.data;

        // Обновление подменю в разделе "Products
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
        setMenuLoader(true);
      } catch (error) {
        console.error("Failed to fetch submenu data:", error);
      }
    };

    fetchSubmenuData();
  }, []);

  // Находим обьект Products из меню и находим текущию категорию сравнивая с парамс страници
  useEffect(() => {
    if (menuLoader) {
      const productsObj = menu.find((item) => item.title === "Products");
      if (productsObj && productsObj.submenu) {
        const findCategory = productsObj.submenu.find((sub) =>
          sub.path.endsWith(`/${params.category}`)
        );
        if (findCategory) {
          setTitle(findCategory.title);
        } else {
          router.push("/error");
        }
      }
    }
  }, [menuLoader, params.category]);

  // Получем данные
  useEffect(() => {
    if (title !== null) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/api/allProducts?category=${title}&subcategory=${selectedCategory}&sortby=${sortBy}&minprice=${minPrice}&maxprice=${maxPrice}&page=${currentPage}`
          );
          if (!response.data.data) {
            throw new Error("No data received");
          }
          setTotalCount(response.data.totalCount);
          setProducts(response.data.data);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [title, selectedCategory, sortBy, minPrice, maxPrice, currentPage]);

  if (!menuLoader) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <section className="flex justify-center overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="flex w-full justify-center">
            <div className="w-full">
              <div className="flex justify-center">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {title}
                </h2>
              </div>
              <div className="flex justify-center">
                <SortFilter data={title} />
              </div>
              <div className="flex justify-center">
                <div className="my-10 flex w-[90vw] flex-wrap justify-around gap-y-12">
                  {error ? (
                    <h3>Failed to load products. Please try again.</h3>
                  ) : (
                    <>
                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          {!products || products.length === 0 ? (
                            <h3>Products in this category do not exist.</h3>
                          ) : (
                            <Suspense fallback={<Loading />}>
                              <ProductCard products={products} />
                            </Suspense>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Pagination totalCount={totalCount} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
