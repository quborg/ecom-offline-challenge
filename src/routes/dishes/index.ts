import fs from 'fs';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.route('/').get((req: Request, res: Response) => {
  res.json({
    response: 'Ramadan Mubarak !'
  });
});

/**
 * Serve dishes.json file on "localhost:3000/dishes"
 */
router.route('/dishes').get((req: Request, res: Response, next: NextFunction) => {
  fs.readFile('src/routes/dishes/dishes.json', (err, json) => {
    res.json(JSON.parse(json.toString()));
    next();
  })
});


export default router;