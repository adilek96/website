"use server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';

export async function adressAction(formData, userId, addressId) {
  "use server";
  const street = formData.get("street");
  const city = formData.get("city");
  const country = formData.get("country");
  const district = formData.get("district");
  const postalCode = formData.get("postalCode");
  const userIdObj = new ObjectId(userId);

  try {
    await connectMongoDB();

    if (addressId === null) {
      // Adding a new address
      await User.findByIdAndUpdate(
        userIdObj,
        {
          $push: {
            addresses: {
              street: street,
              city: city,
              district: district,
              postalCode: postalCode,
              country: country
            }
          }
        },
        { new: true, runValidators: true }
      );
    } else {
      const addressIdObj = new ObjectId(addressId);

      // Updating an existing address
      await User.updateOne(
        { _id: userIdObj, 'addresses._id': addressIdObj },
        {
          $set: {
            'addresses.$.street': street,
            'addresses.$.city': city,
            'addresses.$.district': district,
            'addresses.$.postalCode': postalCode,
            'addresses.$.country': country
          }
        },
        { new: true, runValidators: true }
      );
    }

    revalidatePath(`/profile/adress`);
  } catch (error) {
    return error;
  }
}
