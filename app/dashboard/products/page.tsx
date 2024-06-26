import axios from "axios";
import ProductsTable from "@/components/ProductsTable/ProductsTable";
import Link from "next/link";

async function getProducts() {
  try {
    const res = await axios.get("http://localhost:3000/api/allProducts");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

export default async function DashboardProducts() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="mt-5 text-center text-[30px]">Products</h1>
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/products/addProduct"}>
          <button className="ease-in-up hidden  rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9">
            Add product
          </button>
        </Link>
      </div>

      <ProductsTable products={products} />
    </section>
  );
}
