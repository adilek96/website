import { fetchAllOrders, fetchAllTickets, fetchUsers } from "@/lib/data";

export default async function Dashboard() {
  const users = await fetchUsers();
  const type = "Pending";
  const orders = await fetchAllOrders({ type });
  const tickets = await fetchAllTickets();

  return (
    <div>
      <h1 className="mt-5 text-center text-[30px]">Statistics</h1>
      <div className=" mt-20 flex h-fit w-full flex-wrap justify-center gap-16 px-4">
        <div className="flex h-[200px] w-[290px] flex-col items-center justify-center rounded-md bg-body-color/50 shadow-xl ">
          <div className=" text-4xl font-bold text-green ">
            {users.users.length + 1}
          </div>
          <p className="mt-2 text-2xl">User count</p>
        </div>
        <div className="flex h-[200px] w-[290px] flex-col items-center justify-center rounded-md bg-body-color/50 shadow-xl ">
          <div className=" text-4xl font-bold text-green ">
            {orders.pdata.length + 1}
          </div>
          <p className="mt-2 text-2xl">Orders count</p>
        </div>
        <div className="flex h-[200px] w-[290px] flex-col items-center justify-center rounded-md bg-body-color/50 shadow-xl ">
          <div className=" text-4xl font-bold text-green ">
            {tickets.pdata.length + 1}
          </div>
          <p className="mt-2 text-2xl">Tickets count</p>
        </div>
      </div>
    </div>
  );
}
