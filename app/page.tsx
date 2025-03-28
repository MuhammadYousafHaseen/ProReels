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

  return (
    <div className="container mx-auto px-4 py-6">
  <h1 className="text-3xl font-bold text-center mb-6 text-primary">
    Featured Reels
  </h1>

  {videos.length === 0 ? (
    <div className="flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div
          key={video._id?.toString()}
          className="card bg-base-100 shadow-md p-4 rounded-lg hover:shadow-lg transition-all"
        >
          <h2 className="text-lg font-semibold text-center mb-2">
            {video.title}
          </h2>

          {/* Video Thumbnail with Hover Effect */}
          <div className="relative group w-full max-w-[250px] mx-auto rounded-lg overflow-hidden">
            <IKVideo
              path={video.videoUrl}
              transformation={[{ height: 500, width: 500 }]}
              className="w-full h-auto rounded-lg"
              controls={true}
            />
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
