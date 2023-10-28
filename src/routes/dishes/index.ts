import fs from 'fs';
import { Router } from 'express';

const router = Router();


/**
 * Serve dishes.json file on "localhost:3000/dishes"
 */
router.get('/dishes', () => {
  fs.readFile('src/routes/dishes/dishes.json', (err, json) => JSON.parse(json.toString()));
});


export default router;