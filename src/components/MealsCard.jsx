import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class MealsCard extends Component {
  state = {
    copyText: false,
  };

  render() {
    const { copyText } = this.state;
    const { index, recipe, history } = this.props;
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
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/meals/${recipe.id}`) }
        >
          {recipe.name}
        </button>
        <h2 data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}`}
        </h2>
        <h2 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h2>
        <h2 data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
          {recipe.tags[0]}
        </h2>
        <h2 data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
          {recipe.tags[1]}
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

      </section>

    );
  }
}

MealsCard.propTypes = {
  nameState: PropTypes.string,
}.isRequired;

export default MealsCard;
