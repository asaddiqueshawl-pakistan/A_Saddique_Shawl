import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { authenticateUser } from "@/middlewares/authenticateUser";

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

    const userExist = await User.findById(user.userId).select(
      "role"
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

    if (userExist.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    const { orderId } = await params;

    const order = await Order.findById(orderId).lean();

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
    console.error("Get admin order error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch order",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
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

    const userExist = await User.findById(user.userId).select(
      "role"
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

    if (userExist.role !== "admin") {
      return Response.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    const { orderId } = await params;

    const body = await request.json();

    const { orderStatus } = body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return Response.json(
        {
          success: false,
          message: "Invalid order status",
        },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    order.orderStatus = orderStatus;

    await order.save();

    return Response.json(
      {
        success: true,
        message: "Order status updated successfully",
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          orderStatus: order.orderStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update order status error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update order status",
      },
      { status: 500 }
    );
  }
}