import { Router, Request, Response } from 'express';

import { Suggestion } from '../controllers';
import { validateDay } from '../middleware/validator';

const router = Router();


router.route('/suggest').get(validateDay, async (request: Request, response: Response) => {
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

  if (day) {
    const result: any[] = await Suggestion.getSuggetedDishes(day);
    response.json(result);
  }

});


export default router;