import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_URL_ENDPOINT!,
});

export async function GET() {
 try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
     return NextResponse.json(authenticationParameters);
 } catch (error) {
     console.error(error);
    return NextResponse.json({ error: "ImageKit Authentication Failed" }, { status: 500 });
 }
}