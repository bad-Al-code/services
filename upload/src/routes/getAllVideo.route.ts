import { Router } from 'express';
import { getUserVideoController } from '../controllers/video.controller';

const router = Router();

router.get('/users/:userId/videos', getUserVideoController);

export { router as getAllVideoRouter };
