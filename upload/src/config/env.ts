import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().default('3000'),
    NODE_ENV: z.string().default('dev'),
    RATE_LIMIT_MAX: z.string().default('100'),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_S3_BUCKET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error(
        'Invalid Environment Variables: ',
        env.error.flatten().fieldErrors,
    );

    throw new Error('Invalid environmetn variables');
}

export const envVariables = env.data;
