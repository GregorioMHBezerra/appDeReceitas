import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import MealsCard from './MealsCard';
import DrinksCard from './DrinksCard';
import {
  getKeyOnStorage,
  // setInProgressRecipesOnStorage,
  DONE_RECIPES_KEY,
} from '../services/localStorage';
// import { idPathname } from '../tests/utils/helpers';
// import { checkIngredientSum, checkIngredientSub } from '../redux/actions';

class DoneRecipes extends Component {
  state = {
    // favorite: false,
    localStorage: [],
    copyText: false,
  };

  componentDidMount() {
    // const { history: { location: { pathname } } } = this.props;
    // const { idRecipes, foodOrDrink } = idPathname(pathname);

    const localStorage = getKeyOnStorage(DONE_RECIPES_KEY);
    const localStorageToState = localStorage ? [...localStorage] : [];

    this.setState({ localStorage: localStorageToState });
  }

  filterButtons = (filter = true) => {
    const localStorage = getKeyOnStorage(DONE_RECIPES_KEY);
    const localStorageToState = localStorage ? [...localStorage] : [];
    const teste = localStorageToState.filter((recipe) => recipe.type === filter);
    this.setState({ localStorage: teste });
  };

  resetFilter = () => {
    const localStorage = getKeyOnStorage(DONE_RECIPES_KEY);
    this.setState({ localStorage });
  };

  render() {
    const { history } = this.props;
    const { copyText, localStorage } = this.state;
    return (
      <div>
        <Header title="Done Recipes" data-testid="page-title" history={ history } />

        {copyText && <h3>Link copied!</h3>}
        {/* <h1 >Done Recipes</h1> */}
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
                  <MealsCard index={ index } recipe={ recipe } history={ history } />
                </section>
              );
            }
            return (
              <section key={ `${recipe.id}${recipe.type}` }>
                <DrinksCard index={ index } recipe={ recipe } history={ history } />
              </section>
            );
          })
        )}
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default connect()(DoneRecipes);
