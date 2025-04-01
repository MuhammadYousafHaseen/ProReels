"use client";

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { IKVideo } from "imagekitio-next";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        console.log(data)
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return( <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
  <h1 className="text-3xl font-bold text-center mb-6 text-primary">
    Featured Reels
  </h1>

  {videos.length === 0 ? (
    <div className="flex justify-center items-center h-full">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory flex flex-col items-center gap-4">
      {videos.map((video) => (
        <div
          key={video._id?.toString()}
          className="w-full h-screen flex items-center justify-center snap-center"
        >
          <div className="card bg-base-100 shadow-md p-4 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-center mb-2">
              {video.title}
            </h2>

            {/* Video Container */}
            <div className="relative w-full h-full max-w-md rounded-lg overflow-hidden">
              <IKVideo
                path={video.videoUrl}
                transformation={[{ height: 800, width: 450 }]}
                className="w-full h-auto rounded-lg"
                controls={true}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)
}
