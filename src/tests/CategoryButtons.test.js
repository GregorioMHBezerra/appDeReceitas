import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './utils/rwrar';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('.: Testa component <CategoryButtons> :.', () => {
  describe('<Meals> Testa botões de categorias', () => {
    const pathnameMeals = '/meals';
    const TestIdBtnIconMealsBeef = 'Beef-category-filter';

    beforeEach(() => {
      global.fetch = jest.fn(fetch);
    });

    it('1. <Meals> Testa filtro Beef', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [pathnameMeals] },
      );
      const buttonIconBeef = await screen.findByTestId(TestIdBtnIconMealsBeef);
      expect(buttonIconBeef).toBeVisible();

      userEvent.click(buttonIconBeef);

      const firstRecipeBeef = await screen.findByText(/beef and mustard pie/i);

      expect(firstRecipeBeef).toBeVisible();

      userEvent.click(buttonIconBeef);
    });

    it('2. <Meals> Testa filtro All', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [pathnameMeals] },
      );
      const buttonIconAll = await screen.findByText(/all/i);
      expect(buttonIconAll).not.toBeDisabled();
      expect(buttonIconAll).toBeVisible();

      userEvent.click(buttonIconAll);
      const firstRecipeMeals = await screen.findByText(/corba/i);
      expect(firstRecipeMeals).toBeVisible();
    });
  });

  describe('<Drinks> Testa botões de categorias', () => {
    const TestIdBtnIconDrinksOrdinary = 'Ordinary Drink-category-filter';

    const pathnameDrinks = '/drinks';
    beforeEach(() => {
      global.fetch = jest.fn(fetch);
    });

    it('1. <Drinks> Testa filtro Ordinary Drink', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [pathnameDrinks] },
      );
      const buttonIconOrdinaryDrink = await screen
        .findByTestId(TestIdBtnIconDrinksOrdinary);
      expect(buttonIconOrdinaryDrink).toBeVisible();

      userEvent.click(buttonIconOrdinaryDrink);
      const firstRecipeDrink = await screen.findByText(/ordinary drink/i);

      expect(firstRecipeDrink).toBeVisible();

      userEvent.click(buttonIconOrdinaryDrink);

      const firstRecipeOrdinaryDrink = await screen.findByText(/gg/i);

      waitFor(() => {
        expect(firstRecipeOrdinaryDrink).toBeVisible();
      });
    });

    it('2. <Drinks> Testa filtro All', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [pathnameDrinks] },
      );
      const buttonIconAll = await screen.findByText(/all/i);
      expect(buttonIconAll).not.toBeDisabled();
      expect(buttonIconAll).toBeVisible();

      userEvent.click(buttonIconAll);
      const firstRecipeDrink = await screen.findByText(/gg/i);
      expect(firstRecipeDrink).toBeVisible();
    });
  });
});

// npm run test-coverage -- --collectCoverageFrom=src/components/CategoryButtons.jsx
// npm run test CategoryButtons.test.jsx

// Category Buttons: Patrick Fonseca, Jéssica Pironato;
