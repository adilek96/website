"use server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';



export async function profileUpdateAction(formData, userId) {
  "use server";
  const userName = formData.get("fullname");
  const userEmail = formData.get("email");
  const userPhone = formData.get("phone");
  const userBirthday = formData.get("birthday");
  const birthdayDate = new Date(userBirthday);
  const userIdObj = new ObjectId(userId);

 

 

  try {
    await connectMongoDB();
    await User.findByIdAndUpdate(
        userIdObj,
        { $set:  { name: userName, email: userEmail, birthday: birthdayDate , phone: userPhone} },
        { new: true, runValidators: true }
      );
  } catch (error) {
    return error;
  }
  revalidatePath(`/profile`);
  
}