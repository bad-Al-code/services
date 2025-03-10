import { Router } from 'express';
import { getUserVideoController } from '../controllers/getUserVideo.controller';

const router = Router();

router.get('/users/:userId/videos', getUserVideoController);

export { router as getAllVideoRouter };
