import CategoryTable from "@/components/CategoryTable";
import Link from "next/link";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/category");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function DashboardCategories() {
  let categories = await getCategories();

  return (
    <section>
      <h1 className="mt-5 text-center text-[30px]">Categories</h1>
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/categories/addCategory"}>
          <button className="ease-in-up hidden  rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9">
            Add new category
          </button>
        </Link>
      </div>
      <CategoryTable categories={categories} />
    </section>
  );
}
