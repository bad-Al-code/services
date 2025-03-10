import { Router } from 'express';
import { getSingleVideoController } from '../controllers/getSingleVideo.controller';

const router = Router();

router.get('/users/:userId/videos/:videoId', getSingleVideoController);

export { router as getSingleVideoRouter };
