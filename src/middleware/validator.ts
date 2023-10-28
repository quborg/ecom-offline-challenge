import { Request, Response, NextFunction } from 'express';

export const validateDay = (request: Request, response: Response, next: NextFunction) => {
  const { day }: any = request.query;
  if (!day)
    response.json('Parameter needed: day!');
  const value: number = Number(day);
  if (!Number.isInteger(value))
    response.json('Day of month is not valid a valid number!');
  if (value < 1 || value > 30)
    response.json('Day of Hijri month is between 1 and 30');

  next();
};

export const validateIngredient = (request: Request, response: Response, next: NextFunction) => {
  const { ingredient }: any = request.query;
  if (!ingredient)
    response.json('Parameter needed: ingredient!');
  const result = /^[A-Za-z]+$/.test(ingredient);
  if (!result)
    response.json('Ingredient is not valid!');

  next();
};