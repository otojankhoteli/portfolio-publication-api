import 'reflect-metadata';
require('dotenv').config();
import express from 'express';
import session from 'express-session';
import {createConnection} from 'typeorm';
import {dbConfig} from '../ormconfig';
import logger from './util/Logger';
import authRouter from './api/auth';
import userRouter from './api/user';
import fileRouter from './api/file';
import errorHandler from './util/ErrorHandler';

const startApp = async () => {
  try {
    await createConnection(dbConfig);
    logger.info('db connected');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(session({
      resave: true,
      saveUninitialized: true,
      rolling: true,
      secret: 'keyboard cat',
      cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 5), // millisecond, second, minute
      },
    }));

    app.get('/ping', (req, res, _) => {
      res.send('pong');
    });
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/files', fileRouter);

    app.use(errorHandler);

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
