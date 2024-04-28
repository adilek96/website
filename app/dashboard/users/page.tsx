import UsersTable from "@/components/UsersTable/UsersTable";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/allUsers");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
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
