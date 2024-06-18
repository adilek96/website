import Notification from "@/components/Notification";
import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "Profile", path: "/profile" },
  { id: 2, name: "Adress", path: "/profile/adress" },
  { id: 3, name: "Orders", path: "/profile/orders" },
  { id: 4, name: "Tickets", path: "/profile/tickets" },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[100vw] overflow-hidden pt-[180px] pb-[120px]">
      <div className="container flex w-full   ">
        <div className=" w-full    overflow-auto  rounded-md   ">
          <div className="cover flex h-[250px] max-w-full items-center justify-center rounded-b-none rounded-t-md bg-yellow bg-[url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')] shadow-xl">
            <ProfileHeader ProfileLinks={ProfileLinks} />
          </div>

          <Notification />
          <div className=" flex  max-w-full items-center justify-center rounded-t-none rounded-b-md bg-gray shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
