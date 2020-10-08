import {Router} from 'express';
import multer from 'multer';
import asyncMw from '../util/AsyncMW';
import fs from 'fs/promises';
import logger from '../util/Logger';

const router = Router();
const DEST = 'uploads/';
const upload = multer({dest: DEST});

router.get('/:id',
    asyncMw(async (req, res, next) => {
      res.download(`${DEST}${req.params.id}`, (err) => {
        if (err) {
          next(err);
        }
      });
    }));

router.post('/',
    upload.single('blob'),
    asyncMw(async (req, res, _) => {
      res.json({
        id: `${req.file.filename}`,
        name: req.file.originalname,
      });
    }));

router.delete('/:id',
    asyncMw(async (req, res, _) => {
      try {
        await fs.unlink(`${DEST}${req.params.id}`);
      } catch (e) {
        logger.error(e);
      }
      res.sendStatus(200);
    }));

export default router;
