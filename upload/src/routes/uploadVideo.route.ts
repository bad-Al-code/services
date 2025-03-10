import { Router } from 'express';

import { uploadVideoMiddleware } from '../middlewares/uploadVideo.middleware';
import { uploadVideoController } from '../controllers/uploadVideo.controller';

const router = Router();

router.post(
    '/api/users/:userId/videos',
    uploadVideoMiddleware,
    uploadVideoController,
);

export { router as videoRouter };
