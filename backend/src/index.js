import config from './config';
import Logger from './logger';
import express from 'express';
import expressLoader from './express';
import { db, checkConnection } from './database/index';


async function startServer() {
    const app = express();

    await checkConnection();

    await expressLoader(app);
    Logger.info('✌️ Express loaded');

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`🛡️  Server listening on port: ${config.port} 🛡️`);
    });
}

startServer();

//module.exports = app;