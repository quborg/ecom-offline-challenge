import axios from "axios"
import { getRamadanDayInGregorian } from './helper';

export default class PrayerTimesCalendar {

  lat: number = 21.3891 // Macca Coordinates
  long: number = 39.8579 // Macca Coordinates
  method: number = 4 // Umm Al-Qura University calculation

  // constructor() {}

  /**
   * Get day pray timings
   * @param dayH string
   * @returns {Object} timings
   */
  getDayPrayTimings = async (dayH: string) => {
    const dateG = (await getRamadanDayInGregorian(Number(dayH))).split('-');
    const day = dateG[0];
    const month = dateG[1];
    const year = dateG[2];

    const url = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${this.lat}&longitude=${this.long}&method=${this.method}`

    const timings = await axios.get(url).then(res => {
      const dayTimings = res.data.data.filter((item: any) => day == item.date.gregorian.day)[0];
      return dayTimings.timings;
    });

    return timings;
  }

  /**
   * Get day name of the week
   * @param dayH string
   * @returns {String} week day name
   */
  getWeekDayName = async (dayH: string) => {
    const dateG = (await getRamadanDayInGregorian(Number(dayH))).split('-');
    const day = dateG[0];
    const month = dateG[1];
    const year = dateG[2];

    const url = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${this.lat}&longitude=${this.long}&method=${this.method}`

    const data = await axios.get(url).then(res =>
      res.data.data.filter((item: any) =>
        day == item.date.gregorian.day
      )[0]
    );

    return data?.date?.gregorian?.weekday?.en;
  }

}