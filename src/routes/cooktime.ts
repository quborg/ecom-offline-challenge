import { Router, Request, Response } from 'express';

import { Cooktime } from '../controllers';

import { validateDay, validateIngredient } from '../middleware/validator';

const router = Router();

router.route('/cooktime').get(validateDay, validateIngredient, async (request: Request, response: Response) => {
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

  if (day && ingredient) {
    const result: any[] = await Cooktime.getCooktimeDishes(day, ingredient);
    response.json(result);
  }

});


export default router;