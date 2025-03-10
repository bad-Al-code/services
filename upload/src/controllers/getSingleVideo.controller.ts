import { Request, Response } from 'express';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import httpStatus from 'http-status-codes';

import { db } from '../db';
import { videos } from '../db/schema';

const videoSchema = z.object({
    userId: z.string().uuid(),
    videoId: z.string().uuid(),
});

export const getSingleVideoController = async (req: Request, res: Response) => {
    try {
        const { userId, videoId } = req.params;
        videoSchema.parse({ userId, videoId });

        const video = await db
            .select()
            .from(videos)
            .where(
                and(
                    eq(videos.userId, userId),
                    eq(videos.id, videoId),
                    eq(videos.status, 'completed'),
                ),
            )
            .limit(1);

        if (video.length === 0) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'Video not found' });
            return;
        }

        res.status(httpStatus.OK).json({
            message: 'Video fetched successfuly',
            data: video[0],
        });
    } catch (error) {
        console.error('Error fetching video:', error);

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed tp fetch video',
        });
    }
};
