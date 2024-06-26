import { fetchProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { deleteProductAction } from "@/app/actions/deleteProductAction";
import DeleteSvg from "@/public/images/delete/DeleteSvg";

export default async function DashboardProducts() {
  const { products } = await fetchProducts();

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
      <div className="mt-5 px-4">
        <div className="relative overflow-x-auto">
          <table className=" w-full text-left text-sm rtl:text-right">
            <thead className="  text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Characteristics
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.name} className=" border-b">
                  <th
                    scope="row"
                    className=" whitespace-nowrap px-6 py-4 font-medium "
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.characteristics}</td>
                  <td className="px-6 py-4">{product.category}</td>

                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={product.image[0]}
                      width={100}
                      height={50}
                      alt="product-image"
                    />
                  </td>
                  <td className="cursor-pointer px-6 py-4">
                    <form action={deleteProductAction}>
                      <input type="hidden" name="delete" value={product._id} />
                      <button type="submit">
                        <DeleteSvg />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
