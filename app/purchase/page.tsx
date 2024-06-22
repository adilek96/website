import { testAction } from "@/app/action/testAction";
import PurchaseForm from "@/components/PurchaseForm";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Purchase() {
  const session = await getServerSession(authConfig);

  return (
    <section className="w-[100vw] overflow-hidden pt-[180px] pb-[120px]">
      <PurchaseForm session={session} testAction={testAction} />
    </section>
  );
}
