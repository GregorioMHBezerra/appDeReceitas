import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';

class Meals extends Component {
  render() {
    const { history, btnSearch } = this.props;

    return (
      <div>
        <Header title="Meals" history={ history } />
        { btnSearch && <SearchBar history={ history } />}
        <h1>Receitas</h1>
        <Recipes history={ history } />
        <div>
          <Footer history={ history } />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  apiResult: state.filterReducer.apiResult,
  btnSearch: state.filterReducer.btnSearch,
});

Meals.propTypes = {
  history: PropTypes.string,
  apiResult: PropTypes.arrayOf(PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
  })).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Meals);

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
// Requisitos 16 a 18: Patrick Fonseca e Jéssica Pironato;
