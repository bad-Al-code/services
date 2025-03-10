import { Request, Response } from 'express';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import httpStatus from 'http-status-codes';

import { db } from '../db';
import { videos } from '../db/schema';

const VideoSchema = z.object({
    userId: z.string().uuid(),
    videoId: z.string().uuid(),
});
export const deleteVideoController = async (req: Request, res: Response) => {
    try {
        const { userId, videoId } = req.params;
        VideoSchema.parse({ userId, videoId });

        const video = await db
            .select()
            .from(videos)
            .where(and(eq(videos.userId, userId), eq(videos.id, videoId)))
            .limit(1);

        if (video.length === 0) {
            res.status(httpStatus.NOT_FOUND).json({
                error: 'Videos not found',
            });
            return;
        }

        await db
            .update(videos)
            .set({ status: 'deleted', deletedAt: new Date() })
            .where(eq(videos.id, videoId));

        res.status(httpStatus.OK).json({
            message: 'Video marked as deleted successfully',
        });
    } catch (error) {
        console.error('Error marking video as deleted: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to delete video',
        });
    }
};
