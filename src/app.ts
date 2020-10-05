import 'reflect-metadata';
import express from 'express';
import {createConnection} from 'typeorm';
import {dbConfig} from '../ormconfig';
import logger from './util/logger';

const startApp = async () => {
  try {
    await createConnection(dbConfig);
    logger.info('db connected');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.get('/ping', (req, res, _) => {
      res.send('pong');
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`portfolio-publication-service listening on port ${port}`);
    });
  } catch (e) {
    logger.error('Could not start application %o', e);
    process.exit(1);
  }
};

startApp();
