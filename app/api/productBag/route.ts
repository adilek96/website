import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('email');
  const { products } = await req.json();

  await connectMongoDB();

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    if(products.length > 0) {

    // Преобразуем arr1 в объект для быстрого поиска по productId
    const productMap = user.cart.reduce((acc, item) => {
      acc[item.productId.toString()] = item;
      return acc;
    }, {});
    
    // Проходим по каждому элементу из arr2
    products.forEach(item => {
      const productIdStr = item.productId.toString();
      if (productMap[productIdStr]) {
        // Если продукт уже существует в arr1, проверяем quantity
        if (productMap[productIdStr].quantity < item.quantity) {
          productMap[productIdStr].quantity = item.quantity;
        }
      } else {
        // Если продукт не существует в arr1, добавляем его
        user.cart.push(item);
      }
    });
    
    // обновляем корзину пользователя
    await User.findOneAndUpdate(
      { email: userEmail },
      { cart: user.cart } ,
     
    ); 
    }

    
    // Получение всех продуктов из корзины пользователя
    const productsWithQuantities = await Promise.all(
      user.cart.map(async (item) => {
        const product = await Product.findById(item.productId);
         
        if (!product) {
          return null;
        }

       
        return {
          ...product.toObject(),
          quantity: item.quantity,
        };
      })
    );




    // Фильтрация null значений, если какие-то продукты не были найдены
    const filteredProducts = productsWithQuantities.filter(product => product !== null);


  

    return NextResponse.json({ products: filteredProducts }, { status: 201 });
  } catch (error) {
    console.error(error); // Логирование ошибки для отладки
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
