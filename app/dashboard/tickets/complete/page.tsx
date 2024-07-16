import TicketCard from "@/components/TicketCard.tsx";
import { fetchProcessingTickets } from "@/lib/data";

const DashboardCompleteTickets = async () => {
  const response = await fetchProcessingTickets({
    userId: null,
    status: "Complete",
  });

  return (
    <div className="mb-10 flex items-center justify-center gap-5 overflow-x-auto">
      {response.pdata.map((item, i) => {
        return <TicketCard item={item} page={"Dashboard"} key={i} />;
      })}
    </div>
  );
};
export default DashboardCompleteTickets;
