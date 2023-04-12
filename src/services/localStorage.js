export const USER_KEY = 'user';
export const DONE_RECIPES_KEY = 'doneRecipes';
export const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
export const IN_PROGRESS_RECIPES_KEY = 'inProgressRecipes';
export const USER_NULL = { email: '' };

export const setUserOnStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const setDoneRecipesOnStorage = (recipe) => {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify(recipe));
};

export const setFavoriteRecipesOnStorage = (recipe) => {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(recipe));
};

export const setInProgressRecipesOnStorage = (recipe) => {
  localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify(recipe));
};

export const getKeyOnStorage = (key) => {
  const result = localStorage.getItem(key);
  return JSON.parse(result);
};
export const getUserOnStorage = () => JSON.parse(localStorage
  .getItem(USER_KEY)) || USER_NULL;

export const modifyUserOnStorage = (property, newValue) => {
  const user = getKeyOnStorage(USER_KEY);
  user[property] = newValue;
  setUserOnStorage(user);
};

export const modifyFavoriteOnStorage = ({
  idMeal, strArea, idDrink,
  strCategory, strMeal, strMealThumb,
  strDrink, strDrinkThumb, strAlcoholic }) => {
  // result
  const favoriteResult = {
    id: idMeal || idDrink,
    type: idMeal ? 'meal' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strDrinkThumb || strMealThumb,
  };
  const atualStorage = getKeyOnStorage(FAVORITE_RECIPES_KEY);
  if (atualStorage) {
    const isFavorite = atualStorage.some((recipe) => recipe.id === favoriteResult.id);
    if (isFavorite) {
      const newStorage = atualStorage
        .filter((recipe) => recipe.name !== favoriteResult.name);
      setFavoriteRecipesOnStorage([...newStorage]);
    } else {
      setFavoriteRecipesOnStorage([...atualStorage, favoriteResult]);
    }
  } else {
    setFavoriteRecipesOnStorage([favoriteResult]);
  }
};

export const modifyDoneRecipeOnStorage = ({
  idMeal, strArea, idDrink,
  strCategory, strMeal, strMealThumb,
  strDrink, strDrinkThumb, strAlcoholic, strTags }, doneDate) => {
  const doneResult = {
    id: idMeal || idDrink, // id da receita
    type: idMeal ? 'meal' : 'drink', // meal ou drink
    nationality: strArea || '', // nacionalidade da receita ou texto vazio
    category: strCategory || '', // categoria da receita ou texto vazio
    alcoholicOrNot: strAlcoholic || '', // alcólico ou não alcólico ou texto vazio
    name: strMeal || strDrink, // nome da receita
    image: strDrinkThumb || strMealThumb, // imagem da receita
    tags: (strTags && strTags.split(',')) || [], // array de tags da receita ou array vazio
    doneDate, // quando a receita foi concluída
  };
  const atualStorage = getKeyOnStorage(DONE_RECIPES_KEY);
  if (atualStorage) {
    setDoneRecipesOnStorage([...atualStorage, doneResult]);
  } else {
    setDoneRecipesOnStorage([doneResult]);
  }
};

export const setProgressRecipeOnStorage = ({
  idMeal, idDrink }, ingredients) => {
  const id = idMeal || idDrink;
  const mealOrDrink = id === idDrink ? 'drinks' : 'meals';
  const notmealOrDrink = id === idDrink ? 'meals' : 'drinks';
  const atualStorage = getKeyOnStorage(IN_PROGRESS_RECIPES_KEY) || undefined;

  // const ingredientsObject = ingredients.reduce((acc, ingredient) => {
  //   acc = [...acc, { [ingredient]: false }];
  //   return acc;
  // }, []);

  const progressResult = {
    [id]: [...ingredients],
  };
  if (atualStorage) {
    setInProgressRecipesOnStorage({ ...atualStorage,
      [mealOrDrink]: { ...atualStorage[mealOrDrink], ...progressResult } });
    // {...localStorageAtual, drinks: {...drinks, ...progressResult} }
  } else {
    setInProgressRecipesOnStorage({ [mealOrDrink]: progressResult,
      [notmealOrDrink]: {} });
  }
};

// export const modifyProgressRecipeOnStorage = ({
//   idMeal, idDrink }, ingredients) => {
//   const id = idMeal || idDrink;
//   const mealOrDrink = id === idDrink ? 'drinks' : 'meals';

//   const atualStorage = getKeyOnStorage(IN_PROGRESS_RECIPES_KEY);

//   const initialState = [...atualStorage[mealOrDrink][id]];
//   console.log(atualStorage[mealOrDrink][id]);
//   const ingredientsObject = Object.entries(ingredients).reduce((acc, ingredient2) => {
//     console.log(ingredient2);
//     const tacc = [...acc, { [ingredient2[0]]: ingredient2[1] }];
//     return tacc;
//   }, initialState);
//   console.log(Object.entries(ingredients));
//   const teste = Object.entries(ingredients).map((ingredient) => {
//     const teste2 = atualStorage[mealOrDrink][id].find((reserva) => {
//       console.log(reserva);
//       if (ingredient[0] === Object.keys(reserva)[0]) {
//         return true;
//       }
//     });
//     console.log(teste2);
//     const ingredientEntrie = Object.entries(teste2);
//     if (ingredientEntrie[0] === ingredient[0]) {
//       return { [ingredientEntrie[1]]: !ingredient[1] };
//     }
//     return ingredient;
//   });
//   console.log(teste);

//   console.log(ingredientsObject);

// console.log(ingredientsObject);
// const progressResult = {
//   [id]: [...ingredientsObject],
// };
// console.log(progressResult);
// };

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
// inProgressRecipes
// {
//   drinks: {
//       id-da-bebida: [lista-de-ingredientes-utilizados],
//       ...
//   },
//   meals: {
//       id-da-comida: [lista-de-ingredientes-utilizados],
//       ...
//   }
// }
