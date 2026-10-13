// export async function POST() {
//   try {
//     const response = Response.json(
//       {
//         success: true,
//         message: "Logout successful",
//       },
//       { status: 200 }
//     );

//     response.cookies.set("watch-store-token", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 0,
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("Logout error:", error);

//     return Response.json(
//       {
//         success: false,
//         message: "Failed to logout",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.cookies.set({
      name: "watch-store-token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 }
    );
  }
}