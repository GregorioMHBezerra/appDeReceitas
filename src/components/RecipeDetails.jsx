import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Details from './Details';
import { apiCarrocel } from '../redux/actions';
import { apiRequestCarousel } from '../services/coffeAndBread';

class RecipeDetails extends Component {
  async componentDidMount() {
    await this.didMountApiCarrocel();
  }

  didMountApiCarrocel = async () => {
    const { history: { location: { pathname } }, dispatch } = this.props;
    const results = await apiRequestCarousel(pathname);
    dispatch(apiCarrocel(results));
  };

  render() {
    const { history } = this.props;
    const idRecipes = history.location.pathname.replace(/[^0-9]/g, '');
    return (
      <>
        <h1>Details</h1>
        {history.location.pathname === `/meals/${idRecipes}`
          ? (
            <Details
              history={ history }
              imgSrc="strMealThumb"
              nameRecipe="strMeal"
              iframe
              category="strCategory"
            />)
          : (
            <Details
              history={ history }
              imgSrc="strDrinkThumb"
              nameRecipe="strDrink"
              iframe={ false }
              category="strAlcoholic"
            />)}
      </>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default connect()(RecipeDetails);
