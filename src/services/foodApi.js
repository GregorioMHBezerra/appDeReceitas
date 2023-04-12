export const getApiFoodByName = async (name) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.meals;
};

export const getApiFoodByIngredient = async (ingredient) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.meals;
};

export const getApiFoodByFirstLetter = async (firstLetter) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.meals;
};

export const getApiFoodByCategory = async (category) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  const response = await fetch(urlApi);
  const responseJson = await response.json();

  return responseJson.meals;
};
// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
