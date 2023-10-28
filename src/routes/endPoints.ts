import { Router, Request, Response } from 'express';

import PrayerTimesCalendar from '../services/PrayerTimesCalendar';
import * as Dishes from '../services/dishes';

import * as Valid from '../lib/validator';

const router = Router();
const prayerTimesCalendar = new PrayerTimesCalendar();

router.route('/').get((req: Request, res: Response) => {
  res.json({
    response: 'Ramadan Mubarak !'
  });
});


router.route('/cooktime').get(async (request: Request, response: Response) => {
  /* 
    #swagger.tags = ['cooktime']
    #swagger.summary = 'This is the Ramadan foutour cooktime calculation API.'
    #swagger.description = 'This API response tells us service is up or down.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['day'] = {
      in: 'Hijri month',
      description: 'An integer number representing Ramadan day',
      required: true,
      type: 'int',
      format: '0 or 01',
    }
    #swagger.parameters['ingredient'] = {
      in: 'kitchen',
      description: 'An ingredient name like carrot and chicken',
      required: true,
      type: 'string',
      format: 'abcd',
    }
    #swagger.responses[200] = {
      description: 'Service is',
      schema: { $ref: '#/definitions/successResponse' }
    }
    #swagger.responses[400] = {
      description: 'Parameters issue',
      schema: { $ref: '#/definitions/errorResponse.400' }
    }
    #swagger.responses[500] = {
      description: 'Server Issue',
      schema: { $ref: '#/definitions/errorResponse.500' }
    }
    #swagger.responses[404] = {
      description: 'Not found',
      schema: { $ref: '#/definitions/errorResponse.404' }
    }
  */
  const { day, ingredient }: any = request.query;

  if (!day) { response.json('Need a day number !'); return }
  if (!Valid.validateDay(day)) { response.json("Month's day number is not valid !"); return }
  if (!ingredient) { response.json('Need ingredient !'); return }
  if (!Valid.validateIngredient(ingredient)) { response.json("Ingredient is not valid !"); return }

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


router.route('/suggest').get(async (request: Request, response: Response) => {
  /* 
    #swagger.tags = ['suggest']
    #swagger.summary = 'This is the Ramadan dishes suggestion API.'
    #swagger.description = 'This API response tells us service is up or down.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['day'] = {
      in: 'Hijri month',
      description: 'An integer number representing Ramadan day',
      required: true,
      type: 'int',
      format: '0 or 01',
    }
    #swagger.responses[200] = {
      description: 'Service is',
      schema: { $ref: '#/definitions/successResponse' }
    }
    #swagger.responses[400] = {
      description: 'Parameters issue',
      schema: { $ref: '#/definitions/errorResponse.400' }
    }
    #swagger.responses[500] = {
      description: 'Server Issue',
      schema: { $ref: '#/definitions/errorResponse.500' }
    }
    #swagger.responses[404] = {
      description: 'Not found',
      schema: { $ref: '#/definitions/errorResponse.404' }
    }
  */
  const { day }: any = request.query;

  if (!Valid.validateDay(day)) { response.json("Month's day number is not valid !"); return }
  if (!day) response.json('Need a day number');
  else {
    const dayName = await prayerTimesCalendar.getWeekDayName(day);
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