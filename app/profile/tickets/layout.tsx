import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "Processing", path: "/profile/tickets" },
  { id: 2, name: "Complete", path: "/profile/tickets/complete" },
];

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-10 w-full ">
      <div className="mb-8 flex w-full items-center justify-center">
        <ProfileHeader ProfileLinks={ProfileLinks} type={"sub"} />
      </div>

      {children}
    </div>
  );
}
