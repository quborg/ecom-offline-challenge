import { Router, Request, Response } from 'express';

import PrayerTimesCalendar from '../services/PrayerTimesCalendar';
import * as Dishes from '../services/dishes';

const router = Router();
const prayerTimesCalendar = new PrayerTimesCalendar();

router.route('/').get((req: Request, res: Response) => {
  res.json({
    response: "Ramadan Mubarak !"
  })
});


router.route('/cooktime').get( async (request: Request, response: Response) => {
  const { day, ingredient }: any = request.query;
  if (!ingredient) { response.json('Need ingredient'); return }
  if (!day) { response.json('Need a day number'); return }
  
  const timings = await prayerTimesCalendar.getDayPrayTimings(day);
  const dishes = await Dishes.getDishesByIngredient(ingredient);

  if (!dishes || !dishes.length) response.json('No dish found for ingredient');
  else {
    const result: any[] = [];
    dishes.forEach((dish: any) => result.push({
      name: dish.name,
      ingredients: dish.ingredients,
      cooktime: Dishes.getCooktime(timings.Asr, timings.Maghrib, dish.duration)
    }));

    response.json(result);
  }
});


router.route('/suggest').get( async (request: Request, response: Response) => {
  // console.log(request.query)
  // response.json(request.query)
  const { day }: any = request.query;
  if (!day) response.json('Need a day number');
  else {
    let dayName = await prayerTimesCalendar.getWeekDayName(day);
    const dishes = await Dishes.suggestedDishes(dayName);
    const timings = await prayerTimesCalendar.getDayPrayTimings(day);

    const result: any[] = [];
    dishes.forEach((dish: any) => {
      dish && result.push({
        name: dish.name,
        ingredients: dish.ingredients,
        cooktime: Dishes.getCooktime(timings.Asr, timings.Maghrib, dish.duration)
      })
    });

    response.json(result);
  }
});


export default router;