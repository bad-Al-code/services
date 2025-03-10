import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { videos } from '../db/schema';
import { db } from '../db';

const userIdSchema = z.string().uuid();

export const getUserVideoController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        userIdSchema.parse(userId);

        if (!userId) {
            res.status(httpStatus.BAD_REQUEST).json({
                error: 'User Id is required',
            });
            return;
        }

        const userVideo = await db
            .select()
            .from(videos)
            .where(
                and(eq(videos.userId, userId), eq(videos.status, 'completed')),
            );

        res.status(httpStatus.OK).json({
            message: 'Videos frtched successfully',
            data: userVideo,
        });
    } catch (error) {
        console.error('Error fetching user videos:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch user videos',
        });
    }
};
