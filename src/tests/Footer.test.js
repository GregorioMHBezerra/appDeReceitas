import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';

describe('.: Testa página <Meals> :.', () => {
  const TestEmail = 'test@example.com';
  const TestPassword = 'app123456';

  const TestIdEmailInput = 'email-input';
  const TestIdPasswordInput = 'password-input';
  const TestIdButtonLogin = 'login-submit-btn';

  const TestIdBtnIconDrinks = 'drinks-bottom-btn';
  const TestIdBtnIconMeals = 'meals-bottom-btn';

  test('1 <Footer> Se página renderiza rota /drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconDrinks = screen.getByTestId(TestIdBtnIconDrinks);

    userEvent.click(buttonIconDrinks);

    waitFor(() => {
      expect(history.location.pathname).toBe('/drink');
    });
  });

  test('2 <Footer> Se página renderiza rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconDrinks = screen.getByTestId(TestIdBtnIconDrinks);

    userEvent.click(buttonIconDrinks);

    const buttonIconMeals = screen.getByTestId(TestIdBtnIconMeals);

    userEvent.click(buttonIconMeals);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
  });

  // npm run test-coverage -- --collectCoverageFrom=src/components/Footer.jsx
  // npm run test Footer.test.jsx
});

// Requisitos 18: Jéssica Pironato, Josiane Oliveira e Patrick Fonseca;
