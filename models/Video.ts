import mongoose, { model, Schema, models } from "mongoose";

export const VIDEO_DIMENSTIONS = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    controls?: boolean,
    transformation?: {
        height: number,
        width: number,
        quality?: number,
    }

}

const VideoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    transformation: {
        height: {
            type: Number,
            required: true,
            default: VIDEO_DIMENSTIONS.height,
        },
        width: {
            type: Number,
            required: true,
            default: VIDEO_DIMENSTIONS.width,
        },
        quality: {
            type: Number,
            min: 1,
            max: 100,

        }
    }
}, { timestamps: true });

const Video = models?.Video || model<IVideo>("Video", VideoSchema);

export default Video;