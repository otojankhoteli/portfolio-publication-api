import 'reflect-metadata';
require('dotenv').config();
import express from 'express';
import session from 'express-session';
import {ConnectionOptions, createConnection} from 'typeorm';
import dbConfig = require('../ormconfig');
import logger from './util/Logger';
import authRouter from './api/auth';
import userRouter from './api/user';
import fileRouter from './api/file';
import portfolioRouter from './api/portfolio';
import errorHandler from './util/ErrorHandler';


const startApp = async () => {
  try {
    const conn = await createConnection((dbConfig as ConnectionOptions));
    await conn.runMigrations();
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
    app.use('/portfolios', portfolioRouter);

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
