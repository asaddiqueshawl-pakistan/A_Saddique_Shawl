import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { authenticateUser } from "@/middlewares/authenticateUser";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Check authentication
    const user = await authenticateUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    // Find logged-in user
    const userExist = await User.findById(user.userId).select(
      "name email role"
    );

    if (!userExist) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Admin only
    if (userExist.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    // Get all orders
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      {
        success: true,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get admin orders error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}