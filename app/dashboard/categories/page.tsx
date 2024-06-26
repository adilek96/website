import axios from "axios";
import CategoryTable from "@/components/CategoryTable";
import Link from "next/link";
import { fetchCategories } from "@/lib/data";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import { deleteCategoryAction } from "@/app/actions/deleteCategoryAction";

export default async function DashboardCategories() {
  let categories = await fetchCategories();

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
      <div className="mt-5 px-4">
        <div className="relative flex flex-wrap justify-center gap-10 overflow-x-auto">
          {categories.pdata.map((item) => {
            return (
              <div
                key={item._id}
                className=" relative w-[250px] rounded-md bg-primary bg-opacity-10 p-5 shadow-md "
              >
                <div className=" flex flex-col gap-10 ">
                  <Link href={`/dashboard/categories/${item._id}`}>
                    <div>
                      <p>
                        <b>
                          <i>Title:</i>
                        </b>
                      </p>
                      <span className="font-bold text-primary">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                  <div className="absolute bottom-2 right-3 z-50">
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="delete" value={item._id} />
                      <button type="submit">
                        <DeleteSvg />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
