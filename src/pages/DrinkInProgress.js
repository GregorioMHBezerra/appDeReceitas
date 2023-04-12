import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

class DrinkInProgress extends Component {
  render() {
    const { history } = this.props;
    return (
      <RecipeInProgress history={ history } />
    );
  }
}

DrinkInProgress.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default DrinkInProgress;

// Requisitos 31 e 32: Jéssica e Gregório;
