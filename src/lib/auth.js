import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      "watch-store-token"
    )?.value;

    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded;
  } catch (error) {
    console.error("Authentication error:", error);

    return null;
  }
}