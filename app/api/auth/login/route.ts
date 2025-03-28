import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
        }

        // TODO: Validate user credentials (replace with actual database check)
        if (email !== "test@example.com" || password !== "password123") {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
