import DashboardMenu from "@/components/DashboardMenu";
import DashboardMenuBtn from "@/components/DashboardMenuBtn";
import Notification from "@/components/Notification";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="  overflow-hidden pb-[120px] pt-[180px]">
      <div className="container relative flex w-full  justify-around px-4 ">
        <DashboardMenuBtn />
        <DashboardMenu />
        <div className=" h-[100vh] w-[100vw]  overflow-auto  rounded-md bg-body-color bg-opacity-20 py-5 pl-2 dark:bg-dark dark:bg-opacity-40">
          <Notification />
          {children}
        </div>
      </div>
    </section>
  );
}
