import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User.model";
import { authOptions } from "@/lib/auth.options"; // Ensure correct path

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in MongoDB by email
    const user = await User.findOne({ email: session.user.email }).select("_id");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ userId: user._id.toString() }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
