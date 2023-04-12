import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import copy from 'clipboard-copy';
import renderWithRouterAndRedux from './utils/rwrar';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

jest.mock('clipboard-copy');
const TestIdRecipeImage = 'recipe-photo';
const TestIdRecipeTitle = 'recipe-title';
const TestIdRecipeCategory = 'recipe-category';
const TestIdRecipeInstructions = 'instructions';
const TestIdRecipeVideo = 'video';
const TestIdBtnRecipeStart = 'start-recipe-btn';
const TestIdBtnRecipeShare = 'share-btn';
const TestIdBtnRecipeFavorite = 'favorite-btn';
const TestPathMealCorba = '/meals/52977';
const TestPathDrinkGG = '/drinks/15997';

describe('.: Testa component <Details> :.', () => {
  describe('Testa Details com rota <Meals>', () => {
    beforeEach(() => {
      global.fetch = jest.fn(fetch);
    });

    it('1. <Meals> Testa a renderização correta em Meals', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathMealCorba] },
      );

      const image = await screen.findByTestId(TestIdRecipeImage);
      const title = await screen.findByTestId(TestIdRecipeTitle);
      const category = await screen.findByTestId(TestIdRecipeCategory);
      const instructions = await screen.findByTestId(TestIdRecipeInstructions);
      const video = await screen.findByTestId(TestIdRecipeVideo);

      expect(image).toBeInTheDocument();
      expect(title).toBeVisible();
      expect(category).toBeVisible();
      expect(instructions).toBeVisible();
      expect(video).toBeVisible();
    });

    it('2. <Meals> Testa botão StartRecipe', async () => {
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathMealCorba] },
      );

      const buttonStartRecipe = await screen.findByTestId(TestIdBtnRecipeStart);
      expect(buttonStartRecipe).toBeInTheDocument();

      userEvent.click(buttonStartRecipe);
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
    });

    it('3. <Meals> Testa botão ShareRecipe', async () => {
      copy.mockImplementation(() => {

      });

      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathMealCorba] },
      );

      const buttonSharedRecipe = await screen.findByTestId(TestIdBtnRecipeShare);
      expect(buttonSharedRecipe).toBeInTheDocument();

      userEvent.click(buttonSharedRecipe);
      await waitFor(() => {
        expect(copy).toBeCalled();
      });

      await waitFor(async () => {
        expect(await screen.findByText(/link copied!/i)).toBeInTheDocument();
      });
    });

    it('4. <Meals> Testa botão FavoriteRecipe', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathMealCorba] },
      );

      const buttonFavoriteRecipe = await screen.findByTestId(TestIdBtnRecipeFavorite);
      expect(buttonFavoriteRecipe).toBeInTheDocument();
      expect(buttonFavoriteRecipe.src).toContain('http://localhost/whiteHeartIcon.svg');

      userEvent.click(buttonFavoriteRecipe);
      expect(buttonFavoriteRecipe.src).toContain('http://localhost/blackHeartIcon.svg');
    });

    it('5. <Detail> Se FavoriteRecipe <WhiteHeart> não está em local storage', async () => {
      jest.mock('../services/localStorage');

      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathMealCorba] },
      );

      const buttonFavoriteRecipeWhite = await screen
        .findByTestId(TestIdBtnRecipeFavorite);

      expect(buttonFavoriteRecipeWhite.textContent).toBe('');
      expect(buttonFavoriteRecipeWhite).toBeInTheDocument();
    });
  });

  describe('Testa Details com rota <Drinks>', () => {
    beforeEach(() => {
      global.fetch = jest.fn(fetch);
    });

    it('1. <Drinks> Testa a renderização correta em Drinks', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathDrinkGG] },
      );

      const image = await screen.findByTestId(TestIdRecipeImage);
      const title = await screen.findByTestId(TestIdRecipeTitle);
      const category = await screen.findByTestId(TestIdRecipeCategory);
      const instructions = await screen.findByTestId(TestIdRecipeInstructions);

      expect(image).toBeInTheDocument();
      expect(title).toBeVisible();
      expect(category).toBeVisible();
      expect(instructions).toBeVisible();
    });

    it('2. <Drinks> Testa botão StartRecipe', async () => {
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathDrinkGG] },
      );

      const buttonStartRecipe = await screen.findByTestId(TestIdBtnRecipeStart);
      expect(buttonStartRecipe).toBeInTheDocument();

      userEvent.click(buttonStartRecipe);
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    });

    it('3. <Drinks> Testa botão ShareRecipe', async () => {
      copy.mockImplementation(() => {

      });

      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathDrinkGG] },
      );

      const buttonSharedRecipe = await screen.findByTestId(TestIdBtnRecipeShare);
      expect(buttonSharedRecipe).toBeInTheDocument();

      userEvent.click(buttonSharedRecipe);
      await waitFor(() => {
        expect(copy).toBeCalled();
      });

      await waitFor(async () => {
        expect(await screen.findByText(/link copied!/i)).toBeInTheDocument();
      });
    });

    it('4. <Drinks> Testa botão FavoriteRecipe', async () => {
      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathDrinkGG] },
      );

      const buttonFavoriteRecipe = await screen.findByTestId(TestIdBtnRecipeFavorite);
      expect(buttonFavoriteRecipe).toBeInTheDocument();
      expect(buttonFavoriteRecipe.src).toContain('http://localhost/whiteHeartIcon.svg');

      userEvent.click(buttonFavoriteRecipe);
      expect(buttonFavoriteRecipe.src).toContain('http://localhost/blackHeartIcon.svg');
    });

    it('5. <Detail> Se FavoriteRecipe <WhiteHeart> não está em local storage', async () => {
      jest.mock('../services/localStorage');

      renderWithRouterAndRedux(
        <App />,
        { initialEntries: [TestPathDrinkGG] },
      );

      const buttonFavoriteRecipeWhite = await screen
        .findByTestId(TestIdBtnRecipeFavorite);

      expect(buttonFavoriteRecipeWhite.textContent).toBe('');
      expect(buttonFavoriteRecipeWhite).toBeInTheDocument();
    });
  });
});

// Teste de componente Details.test: Jéssica Pironato, Josiane Oliveira e Patrick Fonseca;

// npm run test-coverage -- --collectCoverageFrom=src/components/Details.jsx
// npm run test Details.test.js

// Aguardando finalização função de desativar botão de finish recipe
