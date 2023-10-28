export const validateDay = (day: string) => {
  const value: number = Number(day);
  if (!Number.isInteger(value)) return false;
  if (value < 1 || value > 30) return false;
  return true;
};

export const validateIngredient = (ingredient: string): boolean => /^[A-Za-z]+$/.test(ingredient);