import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import {
  modifyDoneRecipeOnStorage,
  modifyFavoriteOnStorage,
  getKeyOnStorage,
  FAVORITE_RECIPES_KEY,
  // modifyProgressRecipeOnStorage,
  // DONE_RECIPES_KEY,
  // IN_PROGRESS_RECIPES_KEY,
} from '../services/localStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { idPathname } from '../tests/utils/helpers';
import { apiRequestInProgress } from '../services/coffeAndBread';
import Input from './Input';

const deleteEndUrl = -12;

class RecipeInProgress extends Component {
  state = {
    favorite: false,
    recipeDetails: [],
    copyText: false,
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const result = await apiRequestInProgress(pathname);
    // const atualStorage = getKeyOnStorage(IN_PROGRESS_RECIPES_KEY) || undefined;
    const arrayUtils = ['strMealThumb', 'strMeal',
      'strCategory', 'strInstructions', 'strArea', 'idMeal', 'idDrink',
      'strSource', 'strDrink', 'strDrinkThumb', 'strAlcoholic', 'strTags'];
    const regexIngredient = /strIngredient/i;
    const regexMeasure = /strMeasure/i;
    const unInfo = Object.entries(result)
      .filter((key) => arrayUtils.includes(key[0]));

    const listIngredients = Object.entries(result)
      .filter((key) => regexIngredient.test(key[0]))
      .map((ingredient) => (ingredient[1] ? ingredient[1] : false));
      // .map((ingredient) => (ingredient[1]?.length > 1 ? ingredient[1] : false));
      // esse ?. funciona, pois se não tiver length ele retorna undefined
    const listMeasure = Object.entries(result)
      .filter((key) => regexMeasure
        .test(key[0])).map((measure) => (measure[1] ? measure[1] : false));

    const newResult = [Object.fromEntries(unInfo), listIngredients, listMeasure];
    // Object.fromEntries transforma array de array em array de objeto.  [[0, 1][2, 3]] => [{0: 1} {2: 3}]

    const { idRecipes } = idPathname(pathname);
    const atualStorageFavorite = getKeyOnStorage(FAVORITE_RECIPES_KEY) || undefined;
    const beOrNotBeFavorite = atualStorageFavorite ? atualStorageFavorite
      .some((recipe) => recipe.id === idRecipes) : false;

    this.setState({ favorite: beOrNotBeFavorite, recipeDetails: newResult });
  }

  enableDisabled = () => {
    const { totalCheckedIngredient } = this.props;
    const { recipeDetails } = this.state;
    return totalCheckedIngredient > recipeDetails[1].length;
  };

  render() {
    const { recipeDetails, favorite, copyText } = this.state;
    const { history } = this.props;
    return (
      <div>
        {recipeDetails.length && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb }
              alt="oi"
            />

            <h1 data-testid="recipe-title">
              {recipeDetails[0].strMeal
        || recipeDetails[0].strDrink}
            </h1>
            <h2 data-testid="recipe-category">
              {' '}
              {recipeDetails[0].strCategory}
              {' '}
            </h2>
            <p data-testid="instructions">{recipeDetails[0].strInstructions}</p>
            <form>
              {recipeDetails[1]
                .map((ingredient, index) => {
                  if (ingredient) {
                    return (
                      <Input
                        history={ history }
                        key={ `recipeInProgress${recipeDetails[1][index]}
                      //   ${recipeDetails[2][index]}` }
                        type="checkbox"
                        nameLabel={ ingredient }
                        dataTestId={ `${index}-ingredient-step` }
                      />
                    );
                  }
                  return null;
                })}
            </form>
            {copyText && <h3>Link copied!</h3>}
            <div className="buttonsTopRecipe">
              <button
                className="buttonShareRecipe"
                onClick={ () => {
                  copy(`http://localhost:3000${(history.location.pathname.slice(0, deleteEndUrl))}`);
                  this.setState({ copyText: true });
                } }
              >
                <img
                  data-testid="share-btn"
                  src={ shareIcon }
                  alt="share"
                />
              </button>

              <button
                type="button"
                className="buttonFavoriteRecipe"
                onClick={ () => {
                  this.setState((initial) => ({ favorite: !initial.favorite }));
                  modifyFavoriteOnStorage(recipeDetails[0]);
                } }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favorite ? blackHeart : whiteHeart }
                  alt="favorite"
                />
              </button>
            </div>

            <button
              data-testid="finish-recipe-btn"
              type="button"
              onClick={ () => modifyDoneRecipeOnStorage(
                recipeDetails[0],
                new Date(),
                history.push('/done-recipes'),
              ) }
              disabled={ this.enableDisabled() }
            >
              Finish Recipe

            </button>

          </div>
        )}
      </div>

    );
  }
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  recipeDetails: state.filterReducer.recipeDetails,
  progressRecipes: state.recipesReducer.progressRecipes,
  totalCheckedIngredient: state.recipesReducer.totalCheckedIngredient,
});

export default connect(mapStateToProps)(RecipeInProgress);

// Requisitos 31 e 32: Jéssica e Gregório;
