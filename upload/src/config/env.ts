import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().default('3000'),
    NODE_ENV: z.string().default('dev'),
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
