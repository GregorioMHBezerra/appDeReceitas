import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import FavoriteDrinksCard from './FavoriteDrinksCard';
import FavoriteMealsCard from './FavoriteMealsCard';
import {
  getKeyOnStorage,
  setFavoriteRecipesOnStorage,
  FAVORITE_RECIPES_KEY,
} from '../services/localStorage';
// import { idPathname } from '../tests/utils/helpers';
// import { checkIngredientSum, checkIngredientSub } from '../redux/actions';

class FavoriteRecipes extends Component {
  state = {
    // favorite: false,
    localStorage: [],
    copyText: false,
  };

  componentDidMount() {
    // const { history: { location: { pathname } } } = this.props;
    // const { idRecipes, foodOrDrink } = idPathname(pathname);

    const localStorage = getKeyOnStorage(FAVORITE_RECIPES_KEY);
    const localStorageToState = localStorage ? [...localStorage] : [];

    this.setState({ localStorage: localStorageToState });
  }

  filterButtons = (filter = true) => {
    const localStorage = getKeyOnStorage(FAVORITE_RECIPES_KEY);
    const localStorageToState = localStorage ? [...localStorage] : [];
    const teste = localStorageToState.filter((recipe) => recipe.type === filter);
    this.setState({ localStorage: teste });
  };

  resetFilter = () => {
    const localStorage = getKeyOnStorage(FAVORITE_RECIPES_KEY);
    this.setState({ localStorage });
  };

  unfavorite = (notrecipe) => {
    // console.log(notrecipe);
    const localStorage = getKeyOnStorage(FAVORITE_RECIPES_KEY);
    const newArray = localStorage.filter((recipe) => (recipe.id && recipe.type)
    !== (notrecipe.id && notrecipe.type));
    setFavoriteRecipesOnStorage(newArray);
    this.setState({ localStorage: newArray });
  };

  render() {
    const { history } = this.props;
    const { copyText, localStorage } = this.state;
    return (
      <div>
        <Header title="Favorite Recipes" data-testid="page-title" history={ history } />

        {copyText && <h3>Link copied!</h3>}

        <section>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => this.filterButtons('meal') }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => this.filterButtons('drink') }
          >
            Drinks
          </button>
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => this.resetFilter() }
          >
            All
          </button>
        </section>
        { localStorage.length > 0 && (
          localStorage.map((recipe, index) => {
            if (recipe.type === 'meal') {
              return (
                <section key={ `${recipe.id}${recipe.type}` }>
                  <FavoriteMealsCard
                    index={ index }
                    recipe={ recipe }
                    history={ history }
                    func={ this.unfavorite }
                  />
                </section>
              );
            }
            return (
              <section key={ `${recipe.id}${recipe.type}` }>
                <FavoriteDrinksCard
                  index={ index }
                  recipe={ recipe }
                  history={ history }
                  func={ this.unfavorite }
                />
              </section>
            );
          })
        )}
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default connect()(FavoriteRecipes);
