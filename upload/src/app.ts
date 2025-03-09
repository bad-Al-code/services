import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { db } from './db';
import { videos } from './db/schema';
import { envVariables } from './config/env';

export const createApp = () => {
    const app: Express = express();

    app.use(helmet());

    app.use(express.json());
    app.use(morgan('combined'));

    const limiter = rateLimit({
        windowMs: parseInt(envVariables.RATE_LIMIT_MAX) * 60 * 1000,
        max: parseInt(envVariables.RATE_LIMIT_MAX),
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(limiter);

    app.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allVideos = await db.select().from(videos);
            res.json(allVideos);
        } catch (error) {
            next(error);
        }
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });

    return app;
};
