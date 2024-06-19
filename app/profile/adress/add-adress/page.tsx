import AdressAddingForm from "@/components/AdressAddingForm";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function AddAdress() {
  const session = await getServerSession(authConfig);
  return (
    <div className="flex items-center justify-center">
      <AdressAddingForm session={session} addressId={null} />
    </div>
  );
}
