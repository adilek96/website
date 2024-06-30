import ProfileCard from "@/components/ProfileCard";
import { authConfig } from "@/configs/auth";
import { fetchOneUsers } from "@/lib/data";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession(authConfig);
  const user = await fetchOneUsers(session);

  return (
    <>
      rabotaet
      {/* <ProfileCard user={user} /> */}
    </>
  );
}
