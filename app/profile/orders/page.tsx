import { redirect } from "next/navigation";

export default async function Orders() {
  redirect("/profile/orders/Shipped");
}
