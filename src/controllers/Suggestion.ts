import PrayerTimesCalendar from '../services/PrayerTimesCalendar';
import * as Dishes from '../services/dishes';

const prayerTimesCalendar = new PrayerTimesCalendar();

export const getSuggetedDishes = async (day: string) => {
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

  return result;
}