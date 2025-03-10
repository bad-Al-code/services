import ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export const generateThumbnail = async (videoUrl: string, videoId: string) => {
    const outputDir = path.join(__dirname, '../../thumbnails', videoId);
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .on('end', () => resolve(true))
            .screenshots({
                count: 3,
                folder: outputDir,
                size: '320*240',
                filename: 'thumbnaik-%i.png',
            });
    });
};
