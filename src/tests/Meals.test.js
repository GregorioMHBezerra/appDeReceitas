import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';

describe('.: Testa página <Meals> :.', () => {
  const TestEmail = 'test@example.com';
  const TestPassword = 'app123456';

  const TestIdEmailInput = 'email-input';
  const TestIdPasswordInput = 'password-input';
  const TestIdButtonLogin = 'login-submit-btn';
  const TestIdButtonIconProfile = 'profile-top-btn';
  const TestIdButtonIconSearch = 'search-top-btn';
  const TestIdSearchBar = 'search-input';

  test('1 <Meals> Se página renderiza rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');
  });

  test('2 <Meals> Se página renderiza components corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);
    const buttonIconSearch = screen.getByTestId(TestIdButtonIconSearch);

    expect(buttonIconProfile).toBeVisible();
    expect(buttonIconProfile).toBeInTheDocument();

    expect(buttonIconSearch).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals');
  });

  test('3 <Meals> Se página renderiza components <SearchBar> corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconSearch = screen.getByTestId(TestIdButtonIconSearch);

    const searchInputIcon = screen.getByTestId(TestIdButtonIconSearch);
    expect(searchInputIcon).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    userEvent.click(buttonIconSearch);

    const searchInputShow = screen.getByTestId(TestIdSearchBar);
    expect(searchInputShow).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    userEvent.click(buttonIconSearch);
    expect(searchInputShow).not.toBeVisible();

    expect(history.location.pathname).toBe('/meals');
  });
  // npm run test-coverage -- --collectCoverageFrom=src/pages/Meals.js
  // npm run test Meals.test.js
});
