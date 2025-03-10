import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { envVariables } from './config/env';
import { videoRouter } from './routes/uploadVideo.route';
import { getAllVideoRouter } from './routes/getUserVideo.route';
import { getSingleVideoRouter } from './routes/getSingleVideo.route';
import { deleteVideoRouter } from './routes/deleteVideo.route';

export const createApp = () => {
    const app: Express = express();

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

    app.use(videoRouter);
    app.use(getAllVideoRouter);
    app.use(getSingleVideoRouter);
    app.use(deleteVideoRouter);

    return app;
};
