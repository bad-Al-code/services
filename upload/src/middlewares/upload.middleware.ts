import path from 'node:path';
import { randomUUID } from 'node:crypto';

import multer from 'multer';
import multers3 from 'multer-s3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { eq } from 'drizzle-orm';

import { s3Client } from '../config/aws';
import { envVariables } from '../config/env';
import { videos } from '../db/schema';
import { db } from '../db';

const storage = multers3({
    s3: s3Client,
    bucket: envVariables.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const uniqueSuffix = randomUUID();
        const fileExtension = path.extname(file.originalname);
        cb(null, `videos/${uniqueSuffix}${fileExtension}`);
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) => {
    const allowedTypes = ['.mp4', '.mov', '.avi'];
    const ext = path.extname(file.originalname).toLocaleLowerCase();

    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        const error = new Error('Invalid file types') as unknown as null;
        cb(error, false);
    }
};

const limits = {
    fileSize: 100 * 1024 * 1024, // 100MB
};

const upload = multer({
    storage,
    fileFilter,
    limits,
});

const insertPendingVideo = async (
    videoId: string,
    userId: string,
): Promise<void> => {
    try {
        await db.insert(videos).values({
            id: videoId,
            userId: userId,
            filename: 'pending',
            s3Url: '',
            status: 'pending',
        });
    } catch (dbError) {
        console.error('Database insertion error:', dbError);
        throw dbError;
    }
};

const updateVideoFilename = async (
    videoId: string,
    filename: string,
): Promise<void> => {
    try {
        await db
            .update(videos)
            .set({ filename: filename })
            .where(eq(videos.id, videoId));
    } catch (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
    }
};

const handleUploadError = (err: any, res: Response): Response => {
    console.error('Upload error: ', err);

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res
                .status(httpStatus.REQUEST_TOO_LONG)
                .json({ error: 'File size exceeds limit' });
        }
        return res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
    }

    return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Upload failed' });
};

export const uploadVideoMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log('upload started');

    const videoId = randomUUID();
    const userId = req.params.userId;

    try {
        await insertPendingVideo(videoId, userId);

        (req as any).videoId = videoId;
    } catch (dbError) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Database error',
        });
        return;
    }

    upload.single('video')(req, res, async (err) => {
        if (err) {
            return handleUploadError(err, res);
        }

        if (!req.file) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: 'No video file provided',
            });
        }

        (req as any).s3Url = (req.file as Express.MulterS3.File).location;
        console.log('uploadVideoMiddleware finished');

        try {
            await updateVideoFilename(
                (req as any).videoId,
                req.file.originalname,
            );
        } catch (updateError) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Database update error',
            });
        }

        next();
    });
};
