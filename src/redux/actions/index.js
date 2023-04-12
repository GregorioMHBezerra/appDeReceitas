export const API_FOOD = 'API_FOOD';
export const API_DRINK = 'API_DRINK';
export const API_RESULT = 'API_RESULT';
export const BTN_SEARCH = 'BTN_SEARCH';
export const CLEAR_STATE = 'CLEAR_STATE';
export const IN_PROGRESS_RECIPES = 'IN_PROGRESS_RECIPES';
export const API_CARROCEL = 'API_CARROCEL';
export const SUM_INGREDIENT = 'SUM_INGREDIENT';
export const SUB_INGREDIENT = 'SUB_INGREDIENT';
export const API_RESULT_FILTER = 'API_RESULT_FILTER';
export const RECIPE_DETAILS = 'RECIPE_DETAILS';

export const apiFood = (payload, text) => ({
  type: API_FOOD,
  payload,
  text,
});
export const apiDrink = (payload, text) => ({
  type: API_DRINK,
  payload,
  text,
});
export const requestApi = (payload) => ({
  type: API_RESULT,
  payload,
});
export const filterRecipes = (payload) => ({
  type: API_RESULT_FILTER,
  payload,
});
export const btnSearch = () => ({
  type: BTN_SEARCH,
});
export const clearState = (nameState) => ({
  type: CLEAR_STATE,
  nameState,
});
export const recipeDetails = (payload) => ({
  type: RECIPE_DETAILS,
  payload,
});
export const apiCarrocel = (payload) => ({
  type: API_CARROCEL,
  payload,
});
export const progressRecipes = (idRecipe, mealOrDrink) => ({
  type: IN_PROGRESS_RECIPES,
  idRecipe,
  mealOrDrink,
});
export const checkIngredientSum = () => ({
  type: SUM_INGREDIENT,
});
export const checkIngredientSub = () => ({
  type: SUB_INGREDIENT,
});

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
