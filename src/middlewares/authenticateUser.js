import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function authenticateUser() {

  const cookieStore = await cookies();

  const token = cookieStore.get("watch-store-token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded;
  } catch (error) {
    return null;
  }
}