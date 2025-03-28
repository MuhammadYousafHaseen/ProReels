import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User.model";  // Ensure correct import path
import { connectToDatabase } from "@/lib/db";
// Import your DB connection utility

export async function POST(req: Request) {
    try {
        await connectToDatabase(); // Ensure database connection

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user in database
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // TODO: Implement JWT or NextAuth for session handling

        return NextResponse.json(
            { success: true, message: "Login successful" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
