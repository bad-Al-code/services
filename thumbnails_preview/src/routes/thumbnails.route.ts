import { Router } from 'express';
import {
    generateThumbnailController,
    getThumbnailController,
} from '../controllers/thumbnails.controller';

const router = Router();

router.post('generate', generateThumbnailController);
router.get('get/:videoId', getThumbnailController);

export { router as thumbnailRouter };
