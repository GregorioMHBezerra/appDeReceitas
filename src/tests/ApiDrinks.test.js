import React from 'react';
import renderWithRouterAndRedux from './utils/rwrar';
import App from '../App';
import {
  getApiDrinkByName,
  getApiDrinkByIngredient,
  getApiDrinkByFirstLetter,
  getApiDrinkByCategory,
} from '../services/drinkApi';

describe('.: Testa API <Drinks> :.', () => {
  describe('API <Drinks> retorna por Name', () => {
    test('1. Se API retorna receita por Name corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const drinkNameValid = 'GG';
      const returnApi = await getApiDrinkByName(drinkNameValid);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idDrink');
      expect(returnApi[0]).toHaveProperty('strDrink');
      expect(returnApi[0]).toHaveProperty('strDrinkThumb');
    });

    test('2. Se API retorna receita por Name(Inválido) incorretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const drinkNameInvalid = 'trybe-drink';
      const returnApi = await getApiDrinkByName(drinkNameInvalid);

      expect(returnApi).toBe(null);
    });
  });

  describe('API <Drinks> retorna por Ingredient', () => {
    test('1. Se API retorna receita por Ingredient corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const drinkIngredientValid = 'Galliano';
      const returnApi = await getApiDrinkByIngredient(drinkIngredientValid);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idDrink');
      expect(returnApi[0]).toHaveProperty('strDrink');
      expect(returnApi[0]).toHaveProperty('strDrinkThumb');
    });
  });

  describe('API <Drinks> retorna por FirstLetter', () => {
    test('1. Se API retorna receita por Name corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const drinkFirstLetter = 'a';
      const returnApi = await getApiDrinkByFirstLetter(drinkFirstLetter);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idDrink');
      expect(returnApi[0]).toHaveProperty('strDrink');
      expect(returnApi[0]).toHaveProperty('strDrinkThumb');
    });
  });

  describe('API <Drinks> retorna por Category', () => {
    test('1. Se API retorna receita por Categoria corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const drinkCategory = 'Ordinary_Drink';
      const returnApi = await getApiDrinkByCategory(drinkCategory);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);
    });
  });
});

// npm run test-coverage -- --collectCoverageFrom=src/services/drinkApi.js
// npm run test ApiDrinks.test.js

// Teste por Patrick Fonseca
