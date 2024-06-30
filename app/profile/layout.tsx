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
    <section className="w-[100vw] overflow-hidden pb-[120px] pt-[180px]">
      <div className="container flex w-full   ">
        <div className=" w-full    overflow-auto  rounded-md   ">
          <div className="cover flex h-[250px] max-w-full items-center justify-center rounded-b-none rounded-t-md  bg-body-color bg-opacity-35 shadow-xl">
            <ProfileHeader ProfileLinks={ProfileLinks} />
          </div>

          <Notification />
          <div className=" flex max-w-full items-center  justify-center rounded-b-md rounded-t-none bg-body-color bg-opacity-20  shadow-xl   dark:bg-dark">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
