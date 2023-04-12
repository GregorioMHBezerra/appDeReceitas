import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

class MealInProgress extends Component {
  render() {
    const { history } = this.props;
    return (
      <RecipeInProgress history={ history } />
    );
  }
}

MealInProgress.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default MealInProgress;

// Requisitos 31 e 32: Jéssica e Gregório;
