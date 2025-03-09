import { envVariables } from './config/env';
import { db, dbInstance } from './db';

const main = async () => {
    await dbInstance.start();
    console.log('DB started');
};

main();
