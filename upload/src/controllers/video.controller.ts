import { Request, Response } from 'express';
import httpSatus from 'http-status-codes';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { videos } from '../db/schema';
import { db } from '../db';

const userIdSchema = z.string().uuid();

export const uploadVideoController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        userIdSchema.parse(userId);

        const s3Url = (req as any).s3Url;
        const videoId = (req as any).videoId;

        await db
            .update(videos)
            .set({ s3Url, status: 'completed' })
            .where(eq(videos.id, videoId));

        res.status(httpSatus.CREATED).json({
            message: 'Video uploaded successfully',
            s3Url,
            userId,
            videoId,
        });
        return;
    } catch (error) {
        console.error('Error in uploadVideoController:', error);
        res.status(httpSatus.BAD_REQUEST).json({ error: 'Invalid user ID' });
        return;
    }
};
