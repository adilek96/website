"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Brand from "@/models/brand";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';
import { redirect } from "next/navigation";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export async function brandAction(formData) {
  "use server";
  const name = formData.get("brandname");
  const link = formData.get("brandlink");
  const file = formData.get("brandimage");
  let imageUrl;
  


   
      
    const storageRef = ref(storage, `brands/${name}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
      // Ожидание загрузки изображения
      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Обработка прогресса загрузки, если необходимо
          },
          (error) => {
            reject(error); // Ошибка при загрузке изображения
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                imageUrl = (downloadURL); // Добавление URL в массив
                resolve(); // Завершение промиса после успешной загрузки изображения
              })
              .catch((error) => {
                reject(error); // Ошибка при получении URL изображения
              });
          }
        );
      });


 
 try {
    await connectMongoDB();
    await Brand.create({name, href:link, image:imageUrl})
 } catch (error) {
    return error
 }

  revalidatePath(`/dashboard/brands`);
  redirect('/dashboard/brands')
}