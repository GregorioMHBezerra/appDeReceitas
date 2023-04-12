import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

class FavoriteMealsCard extends Component {
  state = {
    copyText: false,
  };

  render() {
    const { copyText } = this.state;
    const { index, recipe, history, func } = this.props;
    return (
      <section>
        <button type="button" onClick={ () => history.push(`/meals/${recipe.id}`) }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="belissima"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push(`/meals/${recipe.id}`) }
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </button>
        <h2 data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}`}
        </h2>
        {copyText && <h3>Link copied!</h3>}
        <button
          className="buttonShareRecipe"
          onClick={ () => {
            copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
            this.setState({ copyText: true });
          } }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
          />
        </button>
        <button
          type="button"
          className="buttonFavoriteRecipe"
          onClick={ () => func(recipe) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeart }
            alt="favorite"
          />
        </button>
      </section>

    );
  }
}

FavoriteMealsCard.propTypes = {
  nameState: PropTypes.string,
}.isRequired;

export default FavoriteMealsCard;
