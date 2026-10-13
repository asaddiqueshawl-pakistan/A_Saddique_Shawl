import { NextResponse } from "next/server";
import Product from "@/models/Product";
import dbConnect from "@/lib/mongodb";

export async function GET(request) {
  try {
    await dbConnect();


    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    console.log(category);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 }
      );
    }

    const products = await Product.find({
      category: {
        $regex: `^${category.trim()}$`,
        $options: "i",
      },
      isActive: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get products by category error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}