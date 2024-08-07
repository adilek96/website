import ProfileHeader from "@/components/ProfileHeader";

const ProfileLinks = [
  { id: 1, name: "My adress", path: "/profile/adress" },
  {
    id: 2,
    name: "Add adress",
    path: "/profile/adress/add-adress",
  },
];

export default function AdressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-10 w-full ">
      <div className="flex justify-center">
        <ProfileHeader ProfileLinks={ProfileLinks} type={"sub"} />
      </div>

      {children}
    </div>
  );
}
