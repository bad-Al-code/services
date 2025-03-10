import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { videos } from '../db/schema';

const processVideo = async (videoId: string) => {
    let progress = 0;

    while (progress < 100) {
        progress += Math.floor(Math.random() * 20) + 10; // randomly increase between 10-30%;

        if (progress > 100) progress = 100;

        await db
            .update(videos)
            .set({
                progress,
                status: progress < 100 ? 'processing' : 'completed',
            })
            .where(
                and(eq(videos.id, videoId), eq(videos.status, 'processing')),
            );

        console.log(`Video ${videoId} processing: ${progress}%`);

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
};

export const startVideoProcessing = (videoId: string) => {
    processVideo(videoId);
};
