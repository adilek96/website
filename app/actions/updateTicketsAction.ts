"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function updateTicketsAction(formData) {
  "use server";

 const ticketStatus = "Complete"
  const ticketId = formData.get("ticketId")
 
  const objId = ticketId ?  new ObjectId(ticketId) : null;
  

  
try {
  await connectMongoDB();
  await Ticket.findByIdAndUpdate(
  objId,
  { status: ticketStatus}
   
    
  );
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/dashboard/tickets`);
  redirect(`/dashboard/tickets`);
}