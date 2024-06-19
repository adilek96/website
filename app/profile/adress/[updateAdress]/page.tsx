import AdressList from "@/components/AdressList";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import AdressAddingForm from "@/components/AdressAddingForm";

export default async function UpdateAdress({
  params,
}: {
  params: { updateAdress: string };
}) {
  const session = await getServerSession(authConfig);
  return (
    <div className="flex items-center justify-center">
      <AdressAddingForm session={session} addressId={params.updateAdress} />
    </div>
  );
}
