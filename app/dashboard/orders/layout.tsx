import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "Shipped", path: "/dashboard/orders/Shipped" },
  { id: 2, name: "Pending", path: "/dashboard/orders/Pending" },
  { id: 3, name: "Delivered", path: "/dashboard/orders/Delivered" },
  { id: 4, name: "Cancelled", path: "/dashboard/orders/Cancelled" },
];

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProfileHeader ProfileLinks={ProfileLinks} type={"sub"} />
      <div className="mt-5 px-4">
        <div className="mb-10 flex flex-wrap justify-around gap-8">
          {children}
        </div>
      </div>
    </section>
  );
}
