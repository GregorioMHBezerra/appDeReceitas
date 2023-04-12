import React from 'react';
import renderWithRouterAndRedux from './utils/rwrar';
import App from '../App';
import {
  getApiFoodByName,
  getApiFoodByIngredient,
  getApiFoodByFirstLetter,
  getApiFoodByCategory,
} from '../services/foodApi';

describe('.: Testa API <Meals> :.', () => {
  describe('API <Meals> retorna por Name', () => {
    test('1. Se API retorna receita por Name corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const mealNameValid = 'Corba';
      const returnApi = await getApiFoodByName(mealNameValid);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idMeal');
      expect(returnApi[0]).toHaveProperty('strMeal');
      expect(returnApi[0]).toHaveProperty('strMealThumb');
    });

    test('2. Se API retorna receita por Name(Inválido) incorretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const mealNameInvalid = 'trybe-meal';
      const returnApi = await getApiFoodByName(mealNameInvalid);

      expect(returnApi).toBe(null);
    });
  });

  describe('API <Meals> retorna por Ingredient', () => {
    test('1. Se API retorna receita por Ingredient corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const mealIngredientValid = 'Paprika';
      const returnApi = await getApiFoodByIngredient(mealIngredientValid);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idMeal');
      expect(returnApi[0]).toHaveProperty('strMeal');
      expect(returnApi[0]).toHaveProperty('strMealThumb');
    });
  });

  describe('API <Meals> retorna por FirstLetter', () => {
    test('1. Se API retorna receita por Name corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const mealFirstLetter = 'a';
      const returnApi = await getApiFoodByFirstLetter(mealFirstLetter);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);

      expect(returnApi[0]).toHaveProperty('idMeal');
      expect(returnApi[0]).toHaveProperty('strMeal');
      expect(returnApi[0]).toHaveProperty('strMealThumb');
    });
  });

  describe('API <Meals> retorna por Category', () => {
    test('1. Se API retorna receita por Categoria corretamente', async () => {
      renderWithRouterAndRedux(<App />);

      const mealCategory = 'Beef';
      const returnApi = await getApiFoodByCategory(mealCategory);

      expect(Array.isArray(returnApi)).toBe(true);
      expect(returnApi.length).toBeGreaterThan(0);
    });
  });
});

// npm run test-coverage -- --collectCoverageFrom=src/services/foodApi.js
// npm run test ApiMeals.test.js

// Teste por Patrick Fonseca
