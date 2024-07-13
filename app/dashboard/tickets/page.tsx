import TicketCard from "@/components/TicketCard.tsx";
import { fetchProcessingTickets } from "@/lib/data";

const DashboardTickets = async () => {
  const response = await fetchProcessingTickets({ userId: "3412432cdsc" });

  return (
    <div className="mb-10 flex items-center justify-center overflow-x-auto">
      {response.pdata.map((item, i) => {
        return <TicketCard item={item} key={i} />;
      })}
    </div>
  );
};
export default DashboardTickets;
