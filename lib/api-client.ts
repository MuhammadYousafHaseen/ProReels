import { IVideo } from "@/models/Video"

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'| 'PATCH',
    body?: any,
    headers?: Record<string,string>
}
export type VideoFormData = Omit<IVideo,"_id">

class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options:FetchOptions = {}
    ):Promise<T>{
          
        const {method = "GET", body, headers = {}} = options

        const defaultOptions = {
            "Content-Type":"application/json",
            ...headers
        }
        const response = await fetch(`/api${endpoint}`,{
            method,
            headers:defaultOptions,
            body:body ? JSON.stringify(body) : undefined
        })
        if(!response.ok){
            throw new Error(await response.text());
        }

        return response.json();
    }


    async getVideos(){
        return this.fetch<IVideo[]>("/videos");
    }
    async getAVideo(id:string){
        return this.fetch<IVideo>(`/videos/${id}`);
    }
    async createVideo(video:VideoFormData){
        return this.fetch<IVideo>("/videos",{
            method:"POST",
            body:video
        });
    }
}

export const apiClient = new ApiClient();