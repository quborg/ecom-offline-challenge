import axios from "axios";


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
  const nextRamadanInGregorian = await axios.get(url_hToG(nextRamadanDate)).then(res => res.data.data.gregorian.date);

  return nextRamadanInGregorian;
};