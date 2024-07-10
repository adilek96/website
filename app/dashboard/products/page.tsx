import { fetchProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { deleteProductAction } from "@/app/actions/deleteProductAction";
import DeleteSvg from "@/public/images/delete/DeleteSvg";
import AddButton from "@/components/AddButton";

export default async function DashboardProducts() {
  const { products } = await fetchProducts();

  return (
    <section>
      <h1 className="mt-5 text-center text-[30px]">Products</h1>
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/products/addProduct"}>
          <AddButton buttonText={"Add product"} />
        </Link>
      </div>
      <div className="mt-5 px-4">
        <div className="relative overflow-x-auto">
          <table className=" w-full  text-left text-sm rtl:text-right">
            <thead className="  text-xs uppercase">
              <tr className=" border-b-2">
                <th scope="col" className="px-6 py-3">
                  Name
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
                    <Link href={`/dashboard/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </th>

                  <td className="px-6 py-4">{product.category}</td>

                  <td className="px-6 py-4">{product.price}</td>
                  <td className=" px-6 py-4">
                    <div className="h-16 w-16">
                      <Image
                        src={product.image[0]}
                        width={30}
                        height={30}
                        alt="product-image"
                      />
                    </div>
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
