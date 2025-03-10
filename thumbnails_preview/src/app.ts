import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { envVariables } from './config/env';
import { thumbnailRouter } from './routes/thumbnails.route';

export const createApp = () => {
    const app: Express = express();

    app.set('trust proxy', true);
    app.use(helmet());

    app.use(express.json());
    app.use(morgan('dev'));

    const limiter = rateLimit({
        windowMs: parseInt(envVariables.RATE_LIMIT_MAX) * 60 * 1000,
        max: parseInt(envVariables.RATE_LIMIT_MAX),
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(limiter);

    app.get('/', (req, res) => {
        res.send('Thumbnail service');
    });

    app.use('/api/thumbnails/', thumbnailRouter);

    return app;
};
