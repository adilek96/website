import { authConfig } from "@/configs/auth";
import { fetchOneUsers } from "@/lib/data";
import { getServerSession } from "next-auth/next";
import TicketCard from "@/components/TicketCard.tsx";
import { fetchProcessingTickets } from "@/lib/data";

export default async function Tickets() {
  const session = await getServerSession(authConfig);
  const user = await fetchOneUsers(session);

  const response = await fetchProcessingTickets({
    userId: user._id,
    status: "Processing",
  });

  return (
    <div className="mb-10 flex items-center justify-center gap-5 overflow-x-auto">
      {response.pdata.map((item, i) => {
        return <TicketCard item={item} page={"Profile"} key={i} />;
      })}
    </div>
  );
}
