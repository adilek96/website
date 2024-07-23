import { fetchAllOrders } from "@/lib/data";
import Link from "next/link";
import { format } from "date-fns";
import { cancelOrderAction } from "@/app/actions/cancelOrderAction";
import StatusSelecter from "@/components/StatusSelecter";

export default async function DashboardOrders({
  params,
}: {
  params: { order: string };
}) {
  const type = params.order;
  let orders = await fetchAllOrders({ type });

  if (orders.pdata.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p>You dont have any orders</p>
      </div>
    );
  }

  return (
    <>
      {orders.pdata.map((item, i) => {
        return (
          <div
            key={item._id}
            className="m-5 h-fit w-[320px] rounded-md bg-body-color  p-5 shadow-2xl"
          >
            <div>
              <span className="text-md">Order number: </span>
              <span>{item._id}</span>
            </div>

            {item.status !== "Cancelled" ? (
              <StatusSelecter
                userId={item.userId}
                id={item._id}
                status={item.status}
              />
            ) : (
              <div>
                <span className="text-md">Status: </span>
                <span
                  className={
                    item.status === "Cancelled" ? "text-red" : "text-green"
                  }
                >
                  {item.status}
                </span>
              </div>
            )}

            <div>
              <span className="text-md">Payment method: </span>
              <span>{item.paymentMethod}</span>
            </div>
            <div>
              <span className="text-md">Order date: </span>
              <span>
                {format(new Date(item.orderDate), "dd-MM-yyyy HH:mm:ss")}
              </span>
            </div>

            {item.status === "Pending" ? (
              <form action={cancelOrderAction}>
                <input
                  type="hidden"
                  name="orderId"
                  value={String(item._id)}
                  readOnly
                />
                <input
                  type="hidden"
                  name="userId"
                  value={String(item.userId)}
                  readOnly
                />
                <input
                  type="hidden"
                  name="status"
                  value={"Cancelled"}
                  readOnly
                />
                <button className="ease-in-up text-md mt-2 rounded-md bg-primary px-3 py-1  font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp ">
                  Cancel order
                </button>
              </form>
            ) : null}
            <div className="text-md mt-2 flex justify-center">
              <Link href={`/dashboard/orders/${item.status}/${item._id}`}>
                <div className="transition duration-300 hover:opacity-60">
                  <p>See products</p>
                  <p className="text-center">ᐁ</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
