import { Router } from 'express';

import { uploadVideoMiddleware } from '../middlewares/upload.middleware';
import { uploadVideoController } from '../controllers/video.controller';

const router = Router();
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route');
});

router.post(
    '/users/:userId/videos',
    uploadVideoMiddleware,
    uploadVideoController,
);

export { router as videoRouter };
