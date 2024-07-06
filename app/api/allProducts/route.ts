import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";


type SortOption = { [key: string]: 1 | -1 };


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paramsCategory = searchParams.get('category') as string | null;
  const paramsSort = searchParams.get('sortby') as string | null;
  const paramsSubcategory = searchParams.get('subcategory') as string | null;
  const paramsMinPrice = parseInt(searchParams.get('minprice'));
  const paramsMaxPrice = parseInt(searchParams.get('maxprice'));
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = paramsCategory || '';
 

  const sortIs = (): SortOption => {
    switch (paramsSort) {
      case 'Name':
        return { name: 1 };
      case 'PriceUp':
        return { price: -1 };
      case 'PriceDown':
        return { price: 1 };
      case 'DateDown':
        return { updatedAt: 1 };
      case 'DateUp':
        return { updatedAt: -1 };
      default:
        return {}; 
    }
  };

  const sort = sortIs();
   
    await connectMongoDB();
    try{
      const query: any = {};
      console.log(paramsCategory)
      if (paramsCategory && paramsCategory !== "All products") query.category = category;
      if (paramsSubcategory && paramsSubcategory !== 'All') {
        query.subcategory = paramsSubcategory;
      }
      if (paramsMinPrice) query.price = { ...query.price, $gte: paramsMinPrice };
      if (paramsMaxPrice && paramsMaxPrice !== 0) query.price = { ...query.price, $lte: paramsMaxPrice };
    const totalCount = await Product.find(query).sort(sort).countDocuments();
    const data = await Product.find(query).sort(sort).skip((page - 1) * limit)
    .limit(limit).lean();
    return NextResponse.json({ data, totalCount }, { status: 201 });
    }  catch (error) {
      return NextResponse.json(
        { message: "Some is wrong." },
        { status: 500 }
      );
    }
  }

  


  export async function DELETE(req, res) {
    const { id } = await req.json();
    await connectMongoDB();
    await Product.deleteOne({ id });
    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
   
  }