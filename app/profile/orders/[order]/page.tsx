import OrdersList from "@/components/OrdersList";
import { authConfig } from "@/configs/auth";
import { fetchOrders } from "@/lib/data";
import { getServerSession } from "next-auth/next";

export default async function OrderPage({
  params,
}: {
  params: { order: string };
}) {
  const session = await getServerSession(authConfig);
  const type = params.order;
  let orders = await fetchOrders({ session, type });

  if (orders.qty === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p>You dont have any shipped orders</p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <OrdersList data={orders.orders} session={session} />
    </div>
  );
}
