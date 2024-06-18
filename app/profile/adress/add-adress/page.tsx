import AdressAddingForm from "@/components/AdressAddingForm";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function AddAdress() {
  const session = await getServerSession(authConfig);
  return (
    <>
      <AdressAddingForm session={session} />
    </>
  );
}
