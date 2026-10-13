import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { authenticateUser } from "@/middlewares/authenticateUser";
import User from "@/models/User";

export async function GET(request, { params }) {
  try {
    await dbConnect();

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

    const userExist = await User.findById(user.userId).select("email");

    if (!userExist) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { orderId } = await params;

    const order = await Order.findOne({
      _id: orderId,
      userEmail: userExist.email.toLowerCase(),
    }).lean();

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get order details error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch order details",
      },
      { status: 500 }
    );
  }
}