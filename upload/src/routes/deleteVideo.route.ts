import { Router } from 'express';
import { deleteVideoController } from '../controllers/deleteVideo.controller';

const router = Router();

router.delete('/api/users/:userId/videos/:videoId', deleteVideoController);

export { router as deleteVideoRouter };
