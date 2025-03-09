import { Request, Response } from 'express';
import httpSatus from 'http-status-codes';
import { z } from 'zod';

const userIdSchema = z.string().uuid();

export const uploadVideoController = (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        userIdSchema.parse(userId);
    } catch (error) {
        res.status(httpSatus.BAD_REQUEST).json({ error: 'Invalid user ID' });
        return;
    }

    const s3Url = (req as any).s3url;

    res.status(httpSatus.CREATED).json({
        message: 'Video uploaded successfully',
        s3Url: s3Url,
        userId: userId,
    });
    return;
};
