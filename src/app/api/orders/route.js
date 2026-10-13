import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { authenticateUser } from "@/middlewares/authenticateUser";
import User from "@/models/User";


// get user orderes..

export async function GET(request) {
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
      "email"
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

    const orders = await Order.find({
      userEmail: userExist.email.toLowerCase(),
    })
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
    console.log("Get user orders error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}


function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `WT-${timestamp}-${random}`;
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      customer,
      items,
      paymentMethod = "cod",
    } = body;

    // Validate customer
    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city
    ) {
      return Response.json(
        {
          success: false,
          message: "Complete customer information is required",
        },
        { status: 400 }
      );
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Your cart is empty",
        },
        { status: 400 }
      );
    }

    const productIds = items.map((item) => item.productId);

    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true,
    });

    if (products.length !== items.length) {
      return Response.json(
        {
          success: false,
          message: "One or more products are no longer available",
        },
        { status: 400 }
      );
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find(
        (product) => product._id.toString() === item.productId
      );

      if (!product) {
        return Response.json(
          {
            success: false,
            message: "Product not found",
          },
          { status: 404 }
        );
      }

      if (item.quantity < 1) {
        return Response.json(
          {
            success: false,
            message: "Invalid quantity",
          },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return Response.json(
          {
            success: false,
            message: `${product.name} does not have enough stock`,
          },
          { status: 400 }
        );
      }

      const price = product.discountPrice || product.price;

      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images?.[0]?.url || "",
        price,
        quantity: item.quantity,
      });
    }

    const deliveryFee = 250;
    const total = subtotal + deliveryFee;

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      userEmail: customer.email,
      customer,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    });

    return Response.json(
      {
        success: true,
        message: "Order created successfully",
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          total: order.total,
          orderStatus: order.orderStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 }
    );
  }
}



