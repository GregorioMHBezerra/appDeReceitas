import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class DrinksCard extends Component {
  state = {
    copyText: false,
  };

  render() {
    const { copyText } = this.state;
    const { index, recipe, history } = this.props;
    return (
      <section>
        <button type="button" onClick={ () => history.push(`/drinks/${recipe.id}`) }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="belissima"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push(`/drinks/${recipe.id}`) }
          data-testid={ `${index}-horizontal-name` }
        >
          {recipe.name}
        </button>
        <h2 data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.alcoholicOrNot}`}
        </h2>
        <h2 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h2>
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

DrinksCard.propTypes = {
  nameState: PropTypes.string,
}.isRequired;

export default DrinksCard;
