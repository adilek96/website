import ProfileCard from "@/components/ProfileCard";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Adress() {
  const session = await getServerSession(authConfig);
  return <>{/* <ProfileCard session={session} /> */}</>;
}
