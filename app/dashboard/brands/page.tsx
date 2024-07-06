import AddButton from "@/components/AddButton";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Brands() {
  const session = await getServerSession(authConfig);

  return (
    <section>
      <h1 className="mt-5 text-center text-[30px]">Brands</h1>
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/brands/addBrand"}>
          <AddButton buttonText={"Add brand"} />
        </Link>
      </div>
      <div className="mt-5 px-4">
        <div className="relative overflow-x-auto"></div>
      </div>
    </section>
  );
}
