import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
     try {
      const data = await apiClient.getVideos();
      setVideos(data);
     } catch (error) {
      console.error("Error fetching videos:",error);
     }
    }
    fetchVideos();
  },[])

  return (
    <div className="flex">
      
    </div>
  );
}
