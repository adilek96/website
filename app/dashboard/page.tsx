import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <h1>Statistics</h1>
    </div>
  );
}
