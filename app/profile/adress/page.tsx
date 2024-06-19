import AdressList from "@/components/AdressList";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Adress() {
  const session = await getServerSession(authConfig);
  return (
    <div className="w-full">
      <AdressList session={session} />
    </div>
  );
}
