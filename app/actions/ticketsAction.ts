"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function ticketsAction(formData) {
  "use server";
  const ticketsName = formData.get("tname");
  const ticketsPhone = formData.get("tphone") as string;
  const ticketsType = formData.get("type");
  const ticketsMessage = formData.get("message");
  const userId = formData.get("userId")
  const objId = userId ?  new ObjectId(userId) : null;


  
try {
  await connectMongoDB();
  await Ticket.create(
     { tname: ticketsName, phone:  ticketsPhone, type: ticketsType, message: ticketsMessage, userId: objId} 
    
  );
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/`);
  redirect(`/`);
}