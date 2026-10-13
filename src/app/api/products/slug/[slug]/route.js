import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { slug } = await params;

    console.log(slug);

    const product = await Product.findOne({
      slug: slug.toLowerCase(),
      isActive: true,
    });

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET product by slug error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}