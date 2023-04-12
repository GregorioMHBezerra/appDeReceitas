import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipesPage from '../pages/DoneRecipesPage';
import FavoriteRecipesPage from '../pages/FavoriteRecipesPage';
import Meals from '../pages/Meals';
import MealsDetails from '../pages/MealsDetails';
import DrinksDetails from '../pages/DrinksDetails';
import MealInProgress from '../pages/MealInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';
import Apresentacao from '../pages/Apresentacao';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/apresentacao" component={ Apresentacao } />
        <Route exact path="/meals/:id" component={ MealsDetails } />
        <Route exact path="/drinks/:id" component={ DrinksDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipesPage } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipesPage } />
        <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      </Switch>
    );
  }
}

export default Routes;

// Routes.propTypes = {
//   nameState: PropTypes.string,
// }.isRequired;

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
