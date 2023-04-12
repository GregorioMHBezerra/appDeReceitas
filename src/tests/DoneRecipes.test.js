import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './utils/rwrar';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

// const TestIdRecipeImage = 'recipe-photo';
// const TestIdRecipeTitle = 'recipe-title';
// const TestIdRecipeCategory = 'recipe-category';
// const TestIdRecipeIngredient = '${index}-ingredient-name-and-measure';
// const TestIdRecipeInstructions = 'instructions';
// const TestIdRecipeVideo = 'video';
const TestIdTagTitle = 'page-title';

// const TestIdBtnMeals = 'filter-by-meal-btn';
// const TestIdBtnDrinks  = 'filter-by-drink-btn';

// const btnMeals = screen.getByTestId(TestIdBtnMeals)
// const btnDrinks = screen.getByTestId(TestIdBtnDrinks)

describe('<DoneRecipes> Testa a renderização do componente', () => {
  const pathDoneRecipes = '/done-recipes';

  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('1. <Meals> Testa filtro Beef', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathDoneRecipes] },
    );

    const tagTitle = screen.getByTestId(TestIdTagTitle);

    expect(tagTitle).toBeInTheDocument();
  });
});

// // Recipes

// const recipeImage = screen.getByTestId(TestIdRecipeImage)
// const recipeTitle = screen.getByTestId(TestIdRecipeTitle)
// const recipeCategory = screen.getByTestId(TestIdRecipeCategory)
// const recipeIngredient = screen.getByTestId(TestIdRecipeIngredient)
// const recipeInstructions = screen.getByTestId(TestIdRecipeInstructions)
// const recipeVideo = screen.getByTestId(TestIdRecipeVideo)

// npm run test-coverage -- --collectCoverageFrom=src/components/DoneRecipes.jsx
// npm run test DoneRecipes.test.jsx

// Category Buttons: Patrick Fonseca, Jéssica Pironato;
