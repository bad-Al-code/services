import http from 'node:http';

import { createApp } from './app';
import { envVariables } from './config/env';
import { dbInstance } from './db';

const port = envVariables.PORT;
const NODE_ENV = envVariables.NODE_ENV;

const startServer = async () => {
    try {
        await dbInstance.start();
        console.log('Database Started');

        // if (NODE_ENV === 'dev') {
        //     await dbInstance.insertDummyData();
        // }

        const server = http.createServer(createApp());

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        process.on('SIGINT', async () => {
            console.log('Shutting down server...');
            server.close(async () => {
                await dbInstance.end();
                console.log('Server and databse connection closed.');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
        process.exit(1);
    }
};

startServer();
