import { redirect } from "next/navigation";

export default async function DashboardOrders() {
  redirect("/dashboard/orders/Pending");
}
