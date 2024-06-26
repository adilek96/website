import axios from "axios";
import UsersTable from "@/components/UsersTable/UsersTable";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

async function getUsers() {
  try {
    const res = await axios.get("http://localhost:3000/api/allUsers");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

export default async function DashboardUsers() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="mt-5 text-center text-[30px]">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
