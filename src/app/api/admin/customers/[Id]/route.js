import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { Id } = await params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid customer ID",
        },
        { status: 400 }
      );
    }

    const customer = await User.findById(Id).select("-password").lean();

    if (!customer) {
      return Response.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        customer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET SINGLE CUSTOMER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch customer",
      },
      { status: 500 }
    );
  }
}

