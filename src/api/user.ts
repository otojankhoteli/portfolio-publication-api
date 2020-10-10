import {Router} from 'express';
import asyncMw from '../util/AsyncMW';
import * as authService from '../service/auth';

const router = Router();


router.get('/self',
    asyncMw(async (req, res, _) => {
      res.json(req.session.user);
    }));

router.put('/:username',
    asyncMw(async (req, res, _) => {
      await authService.update({username: req.params.username, ...req.body});
      res.sendStatus(200);
    }));

export default router;
