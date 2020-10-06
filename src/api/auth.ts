import {Router} from 'express';
import * as authService from '../service/auth';
import asyncMw from '../util/AsyncMW';
import {registerSchemaValidator} from './middleware/util';
import logger from '../util/Logger';

const router = Router();


router.post('/register',
    asyncMw(registerSchemaValidator),
    asyncMw(async (req, res, _) => {
      await authService.register(req.body);
      res.sendStatus(200);
    }));

router.post('/login',
    asyncMw(async (req, res, _) => {
      req.session.user = await authService.login(req.body);
      res.sendStatus(200);
    }));

router.post('/logout',
    asyncMw(async (req, res, next) => {
      req.session.destroy((err) => {
        logger.debug('session destroyed');
        if (err) {
          next(err);
        }
      });
      res.sendStatus(200);
    }));


router.post('/reset', asyncMw(async (req, res, _) => {

}));

export default router;
