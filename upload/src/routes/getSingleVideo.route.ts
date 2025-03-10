import { Router } from 'express';
import { getSingleVideoController } from '../controllers/getSingleVideo.controller';

const router = Router();

router.get('/api/users/:userId/videos/:videoId', getSingleVideoController);

export { router as getSingleVideoRouter };
