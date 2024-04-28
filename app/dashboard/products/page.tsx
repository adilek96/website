import ProductsTable from "@/components/ProductsTable/ProductsTable";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/allProducts");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
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
