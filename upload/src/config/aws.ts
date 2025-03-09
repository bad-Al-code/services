import { S3Client } from '@aws-sdk/client-s3';

import { envVariables } from './env';

export const s3Client = new S3Client({
    region: envVariables.AWS_REGION,
    credentials: {
        accessKeyId: envVariables.AWS_ACCESS_KEY_ID,
        secretAccessKey: envVariables.AWS_SECRET_ACCESS_KEY,
    },
});
