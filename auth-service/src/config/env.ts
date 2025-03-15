import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  MYSQL_HOST: z.string(),
  MYSQL_PORT: z.string().transform((val) => parseInt(val, 10)),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string(),
  REDIS_PORT: z.string().transform((val) => parseInt(val, 10)),
  REDIS_HOST: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error('Invalid environment variables: ', parsedEnv.error.flatten().fieldErrors);

  throw new Error('Invalid environment variables. Check your .env file or deployment configuration');
}

export const env = parsedEnv.data;
