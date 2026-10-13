import dbConnect from "@/lib/mongodb";
import User from "@/models/User";


export async function GET(request) {
  try {
    await dbConnect();

    const customers = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      {
        success: true,
        customers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}
