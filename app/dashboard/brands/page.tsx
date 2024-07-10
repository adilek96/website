import AddButton from "@/components/AddButton";
import BrandsCard from "@/components/BrandsCard";
import { fetchBrands } from "@/lib/data";
import Link from "next/link";

export default async function Brands() {
  const brands = await fetchBrands();

  return (
    <section>
      <h1 className="mt-5 text-center text-[30px]">Brands</h1>
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/brands/addBrand"}>
          <AddButton buttonText={"Add brand"} />
        </Link>
      </div>
      <div className="mt-5 px-4">
        <div className="mb-10 flex flex-wrap justify-around gap-8">
          {brands.pdata.map((item, i) => {
            return <BrandsCard key={i} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
}
