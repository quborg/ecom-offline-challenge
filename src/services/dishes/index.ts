import axios from "axios";


export const getDishesByIngredient = async (ingredient: string) => {
  let dishes = await axios.get("http://localhost:3000/dishes").then(res => res.data);
  dishes = dishes.filter((item: any) => item.ingredients.join().toLowerCase().includes(ingredient.toLowerCase()))
  return dishes;
}

export const getDishByName = async (name: string) => {
  const dishes = await axios.get("http://localhost:3000/dishes").then(res => res.data);
  const dish = dishes.filter((item: any) => item.name.toLowerCase().includes(name.toLowerCase()))[0]
  return dish;
}

export const getDishesRandom = async () => {
  const randomDishes: any[] = [];
  const dishes = await axios.get("http://localhost:3000/dishes").then(res => res.data);
  for (let index = 0; index < 5; index++) {
    const r = Math.floor(Math.random() * dishes.length);
    randomDishes.push(dishes[r]);
  }
  return randomDishes;
}

export const getSpecialDishes = async (dayName: string) => {
  let specialDishes, dishName;
  const fridayDishes = ['Couscous', 'Kabsa'];
  const sundayDishes = ['BBQ', 'Tajeen', 'Ummak'];
  const mondayIngredient = 'Chicken';

  const d = Math.random();
  switch (dayName) {
    case 'Friday':
      dishName = fridayDishes[(d < .8) ? 0 : 1]; // 80% get Couscous
      specialDishes = [await getDishByName(dishName)];
      break;
    case 'Sunday':
      dishName = sundayDishes[Math.floor(Math.random() * sundayDishes.length)]; // equivalent percentage to get each
      specialDishes = [await getDishByName(dishName)];
      break;
    case 'Monday':
      if (d < 0.9) // 90% chance to get chiken
        specialDishes = await getDishesByIngredient(mondayIngredient);
      break;

    default:
      break;
  }
  return specialDishes;
}

export const getThursdayDishes = async () => {
  let dishes = await axios.get("http://localhost:3000/dishes").then(res => res.data);
  dishes = dishes.filter((item: any) => item.duration < 91);
  return dishes;
}

export const getCooktime = (start: string, end: string, duration: number) => {
  const margin = 15;
  const t1 = start.split(' ')[0].split(':');
  const t2 = end.split(' ')[0].split(':');
  const timeStart = (Number(t1[0]) * 60) + Number(t1[1]);
  const timeEnd = (Number(t2[0]) * 60) + Number(t2[1]);
  const diff = timeEnd - timeStart - margin - duration;

  if (diff > 0)
    return `${diff} minutes after Asr`
  else
    return `${- diff} minutes before Asr`
}

/**
 * function dishes suggestion
 * @param {string} dayName
 * @returns {Array} suggested dishes
 */
export const suggestedDishes = async (dayName: string) => {
  const dishes: any[] = [];
  const uniqStack: any[] = [];

  if (dayName === 'Thursday') return getThursdayDishes();

  const specialDishes = await getSpecialDishes(dayName);
  const randomDishes = await getDishesRandom();

  [...specialDishes, ...randomDishes].forEach((item) => {
    if (item.name && !uniqStack.includes(item.name)) {
      uniqStack.push(item.name);
      dishes.push(item);
    }
  })

  return dishes;
}
