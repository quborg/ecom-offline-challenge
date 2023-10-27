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




// /**
//  * function getTodayFormat 
//  * @returns today string in the following format of today: "DD-MM-YYYY" 
//  * to use in api.aladhan.com as params
//  * @link https://aladhan.com/islamic-calendar-api
//  */
// const getTodayFormat = () => {
//   const D = new Date().toISOString().split('T')[0].split('-');
//   const today = `${D[2]}-${D[1]}-${D[0]}`;
//   return today;
// }



// /**
//  * 
//  * @param month number
//  * @returns last day of the month number
//  */
// const getLastDayMonth = (month: number): number => {
//   const lastDay = new Date(2077, month + 1, 0).toISOString().split('T')[0].split('-')[2];
//   return Number(lastDay);
// }


// /**
//  * 
//  * @param dayRamadan string
//  * @returns obj '{ day, month, year }' gregorian related to Ramadan day
//  */
// const getDateCalendarDay = async (dayRamadan: string) => {
//   const nextEvent = (await getRamadanDayInGregorian()).split('-');
//   const dayEvent = Number(nextEvent[0]);
//   let month = Number(nextEvent[1]);
//   const year = nextEvent[2];
//   const lastDay = getLastDayMonth(month);
//   let day = dayEvent + Number(dayRamadan) - 1;
//   if (day > lastDay) {
//     month += 1;
//     day -= lastDay;
//   }

//   return { day, month, year };
// }


// /**
//  * This function predict next Ramadan in Gregorian calendar
//  * step 1: look at Ramadan if still in the current year or next year
//  * step 2: get Gregorian date to relative Ramadan
//  * @returns next first Ramadan in the Gregorian calendar
//  */
// const getRamadanDayInGregorian = async () => {
//   const today = getTodayFormat();
//   const url_gToH = (date: string) => `http://api.aladhan.com/v1/gToH/${date}`;
//   const url_hToG = (date: string) => `http://api.aladhan.com/v1/hToG/${date}`;

//   // Step 1
//   const currentHijri = await axios.get(url_gToH(today)).then(res => res.data.data.hijri);
//   let yearHijri = Number(currentHijri.year);
//   const ramadanMonthNumber = 9;
//   if (currentHijri.month.number > ramadanMonthNumber)
//     yearHijri += 1;
//   const firstRamadan = `01-09-${yearHijri}`;

//   // Step 2
//   const nextRamadanInGregorian = await axios.get(url_hToG(firstRamadan)).then(res => res.data.data.gregorian.date)

//   return nextRamadanInGregorian;
// }



// /**
//  * Get Asr pray time
//  * @param day string
//  * @returns time string
//  */
// export const getAsrTime = async (day: string) => {
//   const nextEvent = (await getRamadanDayInGregorian()).split('-');
//   const dayEvent = Number(nextEvent[0]);
//   let monthEvent = Number(nextEvent[1]);
//   const yearEvent = nextEvent[2];
//   const lastDay = getLastDayMonth(monthEvent);
//   let calendarDay = dayEvent + Number(day) - 1;
//   if (calendarDay > lastDay) {
//     monthEvent += 1;
//     calendarDay -= lastDay;
//   }

//   const url = `http://api.aladhan.com/v1/calendar/${yearEvent}/${monthEvent}?latitude=${lat}&longitude=${long}&method=${method}`
  
//   const asrTime = await axios.get(url).then(res => {
//     const dayTiming = res.data.data.filter((item: any) => calendarDay == item.date.gregorian.day)[0];
//     return dayTiming.timings.Asr.split(' ')[0];
//   });

//   return asrTime;
// }


// /**
//  * Get the week day name of choosen Ramadan day number
//  * @param day string
//  */
// export const getDayName = async (day: string) => {
//   const date = getDateCalendarDay(day);


//   const url = `http://api.aladhan.com/v1/calendar/${yearEvent}/${monthEvent}?latitude=${lat}&longitude=${long}&method=${method}`
  
//   const asrTime = await axios.get(url).then(res => {
//     data = res.data.data;
//     const dayTiming = res.data.data.filter((item: any) => calendarDay == item.date.gregorian.day)[0];
//     return dayTiming.timings.Asr.split(' ')[0];
//   });

//   return {asrTime, data};
// }