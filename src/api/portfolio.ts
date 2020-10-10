import {Router} from 'express';
import asyncMw from '../util/AsyncMW';
import * as portfolioService from '../service/portfolio';

const router = Router();


router.get('/:id',
    asyncMw(async (req, res, _) => {
      res.json(await portfolioService.getById(req.params.id));
    }));

router.post('/',
    asyncMw(async (req, res, _) => {
      res.json(await portfolioService.save(req.body, req.session.user));
    }));

router.put('/:id',
    asyncMw(async (req, res, _) => {
      res.json(await portfolioService.update({...req.body, id: req.params.id}, req.session.user));
    }));

router.delete('/:id',
    asyncMw(async (req, res, _) => {
      res.json(await portfolioService.remove(req.params.id, req.session.user));
    }));

export default router;
