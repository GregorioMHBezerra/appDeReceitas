import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiFood, requestApi, apiDrink } from '../redux/actions';
import { getApiFoodByName,
  getApiFoodByIngredient, getApiFoodByFirstLetter } from '../services/foodApi';
import * as drinkApi from '../services/drinkApi';

const FIRST_LETTER = 'First Letter';

class SearchInput extends Component {
  state = {
    radioValue: '',
    input: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  buttonValidation = (input, radioValue) => {
    if (radioValue === FIRST_LETTER && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
  };

  apiRequest = async (path) => {
    const { radioValue, input } = this.state;
    const { dispatch } = this.props;
    const teste = this.buttonValidation(input, radioValue);
    // Verificar se essa é a melhor forma de parar a função
    if (teste === false) { return false; }
    let result = {};
    if ((path === '/meals')) {
      dispatch(apiFood(radioValue, input));
      if (radioValue === 'Ingredient') {
        result = await getApiFoodByIngredient(input);
      }
      if (radioValue === 'Name') {
        result = await getApiFoodByName(input);
      }
      if (radioValue === FIRST_LETTER) {
        result = await getApiFoodByFirstLetter(input[0]);
      }
    }

    if ((path === '/drinks')) {
      dispatch(apiDrink(radioValue, input));
      if (radioValue === 'Ingredient') {
        result = await drinkApi.getApiDrinkByIngredient(input);
      }
      if (radioValue === 'Name') {
        result = await drinkApi.getApiDrinkByName(input);
      }
      if (radioValue === FIRST_LETTER) {
        result = await drinkApi.getApiDrinkByFirstLetter(input[0]);
      }
    }

    dispatch(requestApi(result));
  };

  render() {
    const { history } = this.props;
    const { input } = this.state;
    return (
      <form>
        <label htmlFor="search-bar">
          <input
            data-testid="search-input"
            type="text"
            name="input"
            value={ input }
            onChange={ (e) => this.handleChange(e) }
            placeholder="Search Recipe"
          />
        </label>
        <label htmlFor="Ingredient">
          Ingredients
          <input
            data-testid="ingredient-search-radio"
            value="Ingredient"
            id="ingredient"
            name="radioValue"
            type="radio"
            onClick={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="Name">
          Name
          <input
            data-testid="name-search-radio"
            id="name"
            value="Name"
            name="radioValue"
            type="radio"
            onClick={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="First Letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            value="First Letter"
            name="radioValue"
            type="radio"
            onClick={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          // lembrar de colocar a validação
          onClick={ () => this.apiRequest(history.location.pathname) }
        >
          Search
        </button>
      </form>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.string,
}.isRequired;

export default connect()(SearchInput);
