import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('term') as string | null;

    await connectMongoDB();
    try {
        if (!searchTerm) {
            return NextResponse.json({ message: "Search term is required." }, { status: 400 });
        }

        const data = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // $options: 'i' для игнорирования регистра
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        const products = JSON.parse(JSON.stringify(data));
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.error("Error during search:", error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
