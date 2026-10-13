import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { authenticateUser } from "@/middlewares/authenticateUser";

export async function GET() {
  try {
    await dbConnect();

    // Authenticate user
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

    // Get logged-in user
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

    // --------------------------------
    // Basic counts
    // --------------------------------

    const [
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments({ role: "customer" }),
      Order.countDocuments({
        orderStatus: "pending",
      }),
    ]);

    // --------------------------------
    // Revenue
    // --------------------------------

    const revenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult[0]?.totalRevenue || 0;

    // --------------------------------
    // Low stock products
    // --------------------------------

    const lowStockProducts = await Product.find({
      isActive: true,
      stock: {
        $lte: 5,
      },
    })
      .select("name slug stock price images")
      .sort({ stock: 1 })
      .limit(10)
      .lean();

    // --------------------------------
    // Recent orders
    // --------------------------------

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "orderNumber userEmail customer.name total orderStatus paymentStatus createdAt"
      )
      .lean();

    return Response.json(
      {
        success: true,

        stats: {
          totalOrders,
          totalProducts,
          totalCustomers,
          totalRevenue,
          pendingOrders,
        },

        lowStockProducts,

        recentOrders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Admin dashboard error:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}