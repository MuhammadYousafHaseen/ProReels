import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.options";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video"; // Ensure you have a video model
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const videos = await Video.find({}, "title description videoUrl thumbnailUrl").sort({ createdAt: -1 }).lean(); // Ensure correct fields are fetched
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      await connectToDatabase();
  
      // Get JSON body
      const body = await request.json();
      console.log("Received data:", body); // Debugging line
  
      const { title, description, videoUrl, thumbnailUrl } = body;
  
      // Check for missing fields
      if (!title || !description || !videoUrl || !thumbnailUrl) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      // Create a new video entry
      const newVideo = await Video.create({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        _id: session.user.id, // Ensure `session.user.id` exists
        
      });
  
      console.log("Video saved:", newVideo); // Debugging line
  
      return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
      console.error("Error saving video:", error);
      return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
  }