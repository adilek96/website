import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "Processing", path: "/dashboard/tickets" },
  { id: 2, name: "Complete", path: "/dashboard/tickets/complete" },
];

export default function DasboardTicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="mt-5 text-center text-[30px]">Tickets</h1>
      <div className="mt-5 px-4">
        <div className="my-10 w-full ">
          <div className="flex w-full items-center justify-center">
            <ProfileHeader ProfileLinks={ProfileLinks} type={"sub"} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
