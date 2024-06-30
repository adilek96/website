import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "Shipped", path: "/profile/orders/Shipped" },
  { id: 2, name: "Pending", path: "/profile/orders/Pending" },
  { id: 3, name: "Delivered", path: "/profile/orders/Delivered" },
  { id: 4, name: "Cancelled", path: "/profile/orders/Cancelled" },
];

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-10 w-full ">
      <div className="flex w-full items-center justify-center">
        <ProfileHeader ProfileLinks={ProfileLinks} />
      </div>

      {children}
    </div>
  );
}
