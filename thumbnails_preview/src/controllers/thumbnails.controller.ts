import { Request, Response } from 'express';
import { z } from 'zod';
import httpStatus from 'http-status-codes';
import { generateThumbnail } from '../service/thumbnail.service';

const videoData = z.object({
    videoId: z.string().uuid(),
    videoUrl: z.string().uuid(),
});

export const generateThumbnailController = async (
    req: Request,
    res: Response,
) => {
    try {
        const { videoUrl, videoId } = req.body;
        videoData.parse({ videoId, videoUrl });

        if (!videoUrl || !videoId) {
            res.status(httpStatus.BAD_REQUEST).json({
                error: 'Missing videoUrl or videoId',
            });
            return;
        }

        await generateThumbnail(videoUrl, videoId);

        res.status(httpStatus.OK).json({
            message: 'Thumbnail generateion started',
        });
    } catch (error) {
        console.error('Error geneating thumbnail: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to generate thumbnail',
        });
    }
};

export const getThumbnailController = async (req: Request, res: Response) => {
    const { videoId } = req.params;
    // TODO: fetch from s3
    res.status(httpStatus.OK).json({
        message: `Fetching thumbnails for ${videoId}`,
    });
};
