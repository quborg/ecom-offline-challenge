import PrayerTimesCalendar from '../services/PrayerTimesCalendar';
import * as Dishes from '../services/dishes';

const prayerTimesCalendar = new PrayerTimesCalendar();

export const getCooktimeDishes = async (day: string, ingredient: string) => {
  const timings = await prayerTimesCalendar.getDayPrayTimings(day);
  const dishes = await Dishes.getDishesByIngredient(ingredient);

  const result: any[] = [];
  dishes.forEach((dish: any) => result.push({
    name: dish.name,
    ingredients: dish.ingredients,
    cooktime: Dishes.getCooktime(timings.Asr, timings.Maghrib, dish.duration)
  }));

  return result;
}