import ProfileCard from "@/components/ProfileCard";
import { authConfig } from "@/configs/auth";
import { fetchOneUsers } from "@/lib/data";
import { getServerSession } from "next-auth/next";

export default async function Tickets() {
  const session = await getServerSession(authConfig);
  const user = await fetchOneUsers(session);

  return <></>;
}
