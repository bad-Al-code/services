import { Request, Response } from 'express';
import httpSatus from 'http-status-codes';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import { videos } from '../db/schema';
import { db } from '../db';

const userIdSchema = z.string().uuid();

export const uploadVideoController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        userIdSchema.parse(userId);

        const s3Url = (req as any).s3Url;
        const filename = (req as any).file.originalname;

        const videoId = randomUUID();

        await db.insert(videos).values({
            id: videoId,
            userId,
            filename,
            s3Url,
        });

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
