"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import FileUpload from "@/app/components/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  const handleVideoUpload = (res: IKUploadResponse) => {
    setVideoUrl(res.url);
  };

  const handleThumbnailUpload = (res: IKUploadResponse) => {
    setThumbnailUrl(res.url);
    console.log(res.url)
  };


  const handlePostVideo = async () => {
    if (!videoUrl || !thumbnailUrl || !title || !description) {
      setError("Please fill all fields and upload both video and thumbnail.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });
  
      const data = await response.json();
      console.log("Response from API:", data); // Debugging line
  
      if (!response) {
        throw new Error(data.error || "Failed to upload video.");
      }
  
      setVideoUrl(null);
      setThumbnailUrl(null);
      setTitle('');
      setDescription('');
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload video:", err);
      setError("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
      // Reset the form
    <div className="container mx-auto p-4 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-center">Upload Your Video</h1>

      {/* Upload Section */}
      <div className="bg-base-100 p-6 rounded-lg shadow-lg space-y-4">
        {/* Title Input */}
  
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

   

        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />

        {/* Video Upload */}
        <div>
          <label className="block text-lg font-medium mb-2">Upload Video</label>
          <FileUpload onSuccess={handleVideoUpload} fileType="video" />
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="mt-2 w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Upload Thumbnail
          </label>
          <FileUpload onSuccess={handleThumbnailUpload} fileType="image" />
          {thumbnailUrl && (
            <div className="mt-2 w-full max-w-md mx-auto">
              <Image
                src={thumbnailUrl}
                alt="Thumbnail Preview"
                width={300}
                height={200}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Post Video Button */}
      <div className="text-center">
        <button
          onClick={handlePostVideo}
          className="btn btn-primary w-full max-w-md"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Video"}
        </button>
      </div>
    </div>
  );
}
