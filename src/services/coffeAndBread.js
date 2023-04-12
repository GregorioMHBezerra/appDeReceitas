import { idPathname } from '../tests/utils/helpers';

export const apiRequest = async (pathname) => {
  const { idRecipes, foodOrDrink } = idPathname(pathname);
  const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipes}`;
  const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipes}`;
  const urlApi = pathname === `/meals/${idRecipes}` ? urlMeals : urlDrinks;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data[foodOrDrink][0];
};

export const apiRequestInProgress = async (pathname) => {
  const { idRecipes, foodOrDrink } = idPathname(pathname);
  const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipes}`;
  const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipes}`;
  const urlApi = pathname === `/meals/${idRecipes}/in-progress` ? urlMeals : urlDrinks;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data[foodOrDrink][0];
};

export const apiRequestCategory = async (pathname) => {
  const { foodOrDrink } = idPathname(pathname);
  const urlApi = foodOrDrink === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list' : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(urlApi);
  const data = await response.json();
  return Object.values(data)[0];
};

export const apiRequestFiltered = async (pathname, filter) => {
  const { foodOrDrink } = idPathname(pathname);
  const reqMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  const reqDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  const urlApi = foodOrDrink === 'meals' ? reqMeal : reqDrink;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const apiRequestCarousel = async (pathname) => {
  const { foodOrDrink } = idPathname(pathname);
  const SEIS = 6;
  const urlFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlApi = foodOrDrink === 'meals' ? urlDrink : urlFood;
  const key = foodOrDrink === 'meals' ? 'drinks' : 'meals';
  const response = await fetch(urlApi);
  const data = await response.json();
  return data[key]
    .filter((result, index) => (index < SEIS ? result : null));
};

export const apiRequestRecipes = async (pathname) => {
  const { foodOrDrink } = idPathname(pathname);
  const urlFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlApi = foodOrDrink === 'meals' ? urlFood : urlDrink;
  const response = await fetch(urlApi);
  const data = await response.json();
  return Object.values(data)[0];
};
