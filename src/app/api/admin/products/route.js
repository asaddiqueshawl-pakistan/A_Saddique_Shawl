import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";
import { authenticateUser } from "@/middlewares/authenticateUser";

async function checkAdmin() {
  const user = await authenticateUser();

  if (!user) {
    return {
      error: "Authentication required",
      status: 401,
    };
  }

  const admin = await User.findById(user.userId).select("role");

  if (!admin) {
    return {
      error: "User not found",
      status: 404,
    };
  }

  if (admin.role !== "admin") {
    return {
      error: "Admin access required",
      status: 403,
    };
  }

  return { user };
}

export async function GET() {
  try {
    await dbConnect();

    const auth = await checkAdmin();

    if (auth.error) {
      return Response.json(
        {
          success: false,
          message: auth.error,
        },
        { status: auth.status }
      );
    }

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Admin products error:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}