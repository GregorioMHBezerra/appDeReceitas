import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryButtons from './CategoryButtons';
import { apiRequestRecipes } from '../services/coffeAndBread';

class Meals extends Component {
  state = {
    apiResultLocal: [],
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const result = await apiRequestRecipes(pathname);
    this.setState({
      apiResultLocal: result,
    });
  }

  render() {
    const {
      history,
      history: { location: { pathname } },
      apiResult,
      apiResultFilter,
    } = this.props;
    const { apiResultLocal } = this.state;

    const numberOfRecipes = 12;
    const foodOrDrink = pathname === '/meals' ? 'Meal' : 'Drink';

    return (
      <section>
        { (apiResult.length === 1)
        && history.push(`${pathname}/${apiResult[0][`id${foodOrDrink}`]}`) }
        <CategoryButtons history={ history } />
        <ul>
          {apiResultFilter.length === 0
          && (apiResult.length === 0 ? apiResultLocal : apiResult)
            .map((recipe, index) => {
              if (index < numberOfRecipes) {
                return (
                  <li
                    key={ recipe[`id${foodOrDrink}`] }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <button
                      type="button"
                      onClick={
                        () => history.push(`${pathname}/${recipe[`id${foodOrDrink}`]}`)
                      }
                    >
                      <img
                        src={ recipe[`str${foodOrDrink}Thumb`] }
                        alt="Finished recipe ilustration"
                        data-testid={ `${index}-card-img` }
                      />
                    </button>
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      { recipe[`str${foodOrDrink}`] }
                    </p>

                  </li>
                );
              }
              return null;
            })}
          {apiResultFilter.length > 0 && apiResultFilter.map((recipe, index) => {
            if (index < numberOfRecipes) {
              return (
                <li
                  key={ recipe[`id${foodOrDrink}`] }
                  data-testid={ `${index}-recipe-card` }
                >
                  <button
                    type="button"
                    onClick={
                      () => history.push(`${pathname}/${recipe[`id${foodOrDrink}`]}`)
                    }
                  >
                    <img
                      src={ recipe[`str${foodOrDrink}Thumb`] }
                      alt="Finished recipe ilustration"
                      data-testid={ `${index}-card-img` }
                    />
                  </button>
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe[`str${foodOrDrink}`] }
                  </p>

                </li>
              );
            }
            return null;
          })}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  apiResult: state.filterReducer.apiResult,
  btnSearch: state.filterReducer.btnSearch,
  apiResultFilter: state.filterReducer.apiResultFilter,
});

Meals.propTypes = {
  history: PropTypes.string,
  apiResult: PropTypes.arrayOf(PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  })).isRequired,
  apiResultFilter: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Meals);
