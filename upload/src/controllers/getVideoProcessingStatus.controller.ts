import httpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { videos } from '../db/schema';
import { eq } from 'drizzle-orm';

const videoSchema = z.object({
    userId: z.string().uuid(),
    videoId: z.string().uuid(),
});

export const getVideoProcessingStatusController = async (
    req: Request,
    res: Response,
) => {
    try {
        const { userId, videoId } = req.params;
        videoSchema.parse({ userId, videoId });

        const video = await db
            .select({ progress: videos.progress, status: videos.status })
            .from(videos)
            .where(eq(videos.id, videoId))
            .limit(1);

        if (video.length === 0) {
            res.status(httpStatus.NOT_FOUND).json({ errro: 'Video not found' });
            return;
        }

        res.status(httpStatus.OK).json({
            message: 'Videro processing status fetched successfully',
            data: video[0],
        });
    } catch (error) {
        console.error('Error fetching video status: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to etch video status',
        });
    }
};
