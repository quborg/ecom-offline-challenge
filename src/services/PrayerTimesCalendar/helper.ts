import axios from "axios"


const monthNumberRamadan = 9;


/**
 * function getTodayFormated
 * @returns today string in the following format of today: "DD-MM-YYYY"
 * to use in api.aladhan.com as params
 * @link https://aladhan.com/islamic-calendar-api
 */
const getTodayFormated = () => {
  const D = new Date().toISOString().split('T')[0].split('-');
  const today = `${D[2]}-${D[1]}-${D[0]}`; // make "DD-MM-YYYY"
  return today;
}


/**
 * This function predict next Ramadan day in the Gregorian calendar,
 * is that become to this year or next year.
 * step 1: compare today hijri with given Ramadan day, this year or next
 * step 2: get Gregorian date to relative valid Ramadan given day
 * @returns { string } Ramadan date in the Gregorian calendar 'DD-MM-YYYY'
 */
export const getRamadanDayInGregorian = async (day: number) => {
  const todayG = getTodayFormated();
  const url_gToH = (date: string) => `http://api.aladhan.com/v1/gToH/${date}`;
  const url_hToG = (date: string) => `http://api.aladhan.com/v1/hToG/${date}`;

  // Step 1
  const todayH = await axios.get(url_gToH(todayG)).then(res => res.data.data.hijri);
  let yearH = Number(todayH.year);

  if (todayH.month.number > monthNumberRamadan)
    yearH += 1;
  if (todayH.month.number == monthNumberRamadan && Number(todayH.day) > day)
    yearH += 1;

    const nextRamadanDate = `${day}-${monthNumberRamadan}-${yearH}`;

  // Step 2
  const nextRamadanInGregorian = await axios.get(url_hToG(nextRamadanDate)).then(res => res.data.data.gregorian.date)

  return nextRamadanInGregorian;
}


/**
 * 
 * @param dayRamadan string
 * @returns obj '{ day, month, year }' gregorian related to Ramadan day
 */
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



/**
 * Get Asr pray time
 * @param day string
 * @returns time string
 */
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


/**
 * Get the week day name of choosen Ramadan day number
 * @param day string
 */
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