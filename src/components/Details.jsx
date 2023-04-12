import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { recipeDetails, progressRecipes } from '../redux/actions';
import {
  modifyFavoriteOnStorage,
  FAVORITE_RECIPES_KEY,
  IN_PROGRESS_RECIPES_KEY,
  getKeyOnStorage,
  DONE_RECIPES_KEY,
  setProgressRecipeOnStorage,
} from '../services/localStorage';
import { idPathname } from '../tests/utils/helpers';
import { apiRequest } from '../services/coffeAndBread';

// const copy = require('clipboard-copy');

class RecipeDetails extends Component {
  state = {
    favorite: false,
    copyText: false,
    progress: false,
    done: false,
  };

  componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    this.requestApi(pathname);
    const { idRecipes, foodOrDrink } = idPathname(pathname);
    const atualStorageFavorite = getKeyOnStorage(FAVORITE_RECIPES_KEY) || undefined;
    const beOrNotBeFavorite = atualStorageFavorite ? atualStorageFavorite
      .some((recipe) => recipe.id === idRecipes) : false;

    const atualStorageDone = getKeyOnStorage(DONE_RECIPES_KEY) || undefined;
    const beOrNotBeDone = atualStorageDone ? atualStorageDone
      .some((recipe) => recipe.id === idRecipes) : false;

    const atualStorageProgress = getKeyOnStorage(IN_PROGRESS_RECIPES_KEY) || undefined;
    const result = atualStorageProgress
      ? Object.keys(atualStorageProgress[foodOrDrink]).includes(idRecipes)
      : false;
    this.setState({ favorite: beOrNotBeFavorite, progress: result, done: beOrNotBeDone });
  }

  dispatchProgressRecipes = (pathname) => {
    const { dispatch } = this.props;
    const { idRecipes, foodOrDrink } = idPathname(pathname);
    // const atualStorageProgress = getKeyOnStorage(IN_PROGRESS_RECIPES_KEY);
    // const result = atualStorageProgress
    //   ? Object.values(atualStorageProgress[foodOrDrink])
    //     .some((recipe) => recipe.id === idRecipes)
    //   : false;
    // if (result) {
    dispatch(progressRecipes(idRecipes, foodOrDrink));
    // }
  };

  requestApi = async (pathname) => {
    const { dispatch } = this.props;
    const result = await apiRequest(pathname);
    const arrayUtils = ['idMeal',
      'strMealThumb', 'strMeal', 'strCategory', 'strInstructions', 'strArea',
      'strSource', 'strDrink', 'idDrink', 'strDrinkThumb', 'strAlcoholic', 'strTags'];

    const regexIngredient = /strIngredient/i;
    const regexMeasure = /strMeasure/i;
    const unInfo = Object.entries(result)
      .filter((key) => arrayUtils.includes(key[0]));

    const listIngredients = Object.entries(result)
      .filter((key) => regexIngredient
        .test(key[0])).filter((ingredient) => ingredient[1]).map((ingre) => (
        ingre.length > 1 ? ingre[1] : null));
    //  talvez seja melhor usar filter no lugar do map
    const listMeasure = Object.entries(result)
      .filter((key) => regexMeasure
        .test(key[0])).filter((measure) => measure[1]).map((mea) => (
        mea.length > 1 ? mea[1] : null));

    const newResult = [Object.fromEntries(unInfo), listIngredients, listMeasure];
    dispatch(recipeDetails(newResult));
  };

  render() {
    const { recipeDetails2, history,
      imgSrc, nameRecipe, iframe, category } = this.props;
    const { favorite, copyText, progress, done } = this.state;
    return (
      recipeDetails2.length > 0 ? (
        <section>
          <img
            data-testid="recipe-photo"
            src={ recipeDetails2[0][imgSrc] }
            alt={ recipeDetails2[0][nameRecipe] }
          />
          <h1 data-testid="recipe-title">{recipeDetails2[0][nameRecipe]}</h1>
          <h2 data-testid="recipe-category">{recipeDetails2[0][category]}</h2>

          <p data-testid="instructions">{(recipeDetails2[0]).strInstructions}</p>
          {iframe && (
            <iframe
              data-testid="video"
              width="853"
              height="480"
              src={ `https://www.youtube.com/embed/${(recipeDetails2[0]).strSource}` }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}

          { recipeDetails2[1].map((detail, index) => (
            // O index na key pode dar muitos erros
            detail.length > 1 ? (
              <div key={ `${detail}${index}` }>
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  {' '}
                  {detail}
                  {' '}
                </p>
              </div>
            ) : null
          ))}
          { recipeDetails2[2].map((detail, index) => (
            // O index na key pode dar muitos erros
            detail.length > 1 ? (
              <div key={ `${detail}${index}` }>
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  {' '}
                  {detail}
                  {' '}
                </p>
              </div>
            ) : null
          ))}
          {!done && (
            <button
              type="button"
              className="buttonStartRecipe"
              data-testid="start-recipe-btn"
              onClick={ () => {
                this.dispatchProgressRecipes(history.location.pathname);
                setProgressRecipeOnStorage(recipeDetails2[0], []);
                history.push(`${history.location.pathname}/in-progress`);
              } }
            >
              {
                progress ? 'Continue Recipe' : 'Start Recipe'
              }
            </button>
          )}

          {copyText && <span>Link copied!</span>}
          <div className="buttonsTopRecipe">
            <button
              className="buttonShareRecipe"
              onClick={ () => {
                copy(`http://localhost:3000${history.location.pathname}`);
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
                modifyFavoriteOnStorage(recipeDetails2[0]);
              } }
            >
              <img
                data-testid="favorite-btn"
                src={ favorite ? blackHeart : whiteHeart }
                alt="favorite"
              />
            </button>
          </div>

        </section>
      ) : <h1>Loading...</h1>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  recipeDetails2: state.filterReducer.recipeDetails,
  apiCarrocel: state.filterReducer.apiCarrocel,
  progressRecipes2: state.recipesReducer.progressRecipes,
});

export default connect(mapStateToProps)(RecipeDetails);
