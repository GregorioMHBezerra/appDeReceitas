export const getApiDrinkByName = async (name) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.drinks;
};

export const getApiDrinkByIngredient = async (ingredient) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.drinks;
};

export const getApiDrinkByFirstLetter = async (firstLetter) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.drinks;
};

export const getApiDrinkByCategory = async (category) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.drinks;
};
// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
