import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User.model";




export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }
        
        await User.create({ email, password });

        return NextResponse.json({ message: `User Registered Successfully` }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: `Failed to Register User ${error}` }, { status: 500 });
    }
}