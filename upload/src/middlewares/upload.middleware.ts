import path from 'node:path';
import { randomUUID } from 'node:crypto';

import multer, { MulterError } from 'multer';
import multers3 from 'multer-s3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import { s3Client } from '../config/aws';
import { envVariables } from '../config/env';

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

export const uploadVideoMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log('upload started');
    upload.single('video')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('uploadVideoMiddleware error:', err);

            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(httpStatus.REQUEST_TOO_LONG).json({
                    error: 'File size excess limit (100MB)',
                });
            }

            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ error: err.message });
        } else if (err) {
            console.error('uploadVideoMiddleware error:', err);

            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ error: err.message });
        }

        if (!req.file) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: 'No video file provided',
            });
        }

        (req as any).s3Url = (req.file as any).location;
        console.log('uploadVideoMiddleware finished');

        next();
    });
};
