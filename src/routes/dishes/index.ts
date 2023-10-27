import fs from 'fs';
import { Router } from 'express';

const router = Router();


/**
 * Serve dishes.json file on "localhost:3000/dishes"
 */
router.get('/dishes', (req, res) => {
  fs.readFile('src/routes/dishes/dishes.json', (err, json) => {
    let obj = JSON.parse(json.toString());
    res.json(obj);
  });
});


export default router;