import { S3Client } from '@aws-sdk/client-s3';

import { envVariables } from './env';

export const s3 = new S3Client({
    credentials: {
        accessKeyId: envVariables.AWS_ACCESS_KEY_ID,
        secretAccessKey: envVariables.AWS_SECRET_ACCESS_KEY,
    },
});
