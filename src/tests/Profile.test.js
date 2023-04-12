import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';
import Profile from '../pages/Profile';
import { getUserOnStorage } from '../services/localStorage';

describe('.: Testa página <Profile> :.', () => {
  const TestIdEmail = 'test@example.com';
  const TestIdPassword = 'app123456';
  const TestIdEmailInput = 'email-input';
  const TestIdPasswordInput = 'password-input';
  const TestIdButtonLogin = 'login-submit-btn';

  const TestIdButtonDoneRecipes = 'profile-done-btn';
  const TestIdButtonFavoriteRecipes = 'profile-favorite-btn';
  const TestIdButtonLogout = 'profile-logout-btn';

  const TestIdButtonIconProfile = 'profile-top-btn';

  test('1 <Profile> Se página renderiza rota /profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestIdEmail);
    userEvent.type(inputPassword, TestIdPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);

    userEvent.click(buttonIconProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  test('2 <Profile> Se página renderiza rota /profile com local storage limpo', async () => {
    jest.mock('../services/localStorage');

    beforeEach(() => {
      getUserOnStorage.mockReturnValue(null);
    });

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const userEmailEmpty = screen.getByTestId('profile-email');

    expect(userEmailEmpty.textContent).toEqual('');
    expect(userEmailEmpty).toBeInTheDocument();
  });

  // test('2 <Profile> Se página renderiza rota /profile com local storage limpo', async () => {
  //   jest.mock('../services/localStorage', () => ({
  //     __esModule: true,
  //     getUserOnStorage: jest.fn(),
  //   }));

  //   renderWithRouterAndRedux(<Profile />);

  //   const userEmailEmpty = screen.getByTestId('profile-email');

  //   expect(userEmailEmpty).toEqual('');
  //   expect(userEmailEmpty).toBeInTheDocument();
  // });

  // test('2 <Profile> Se página renderiza rota /profile com local storage limpo', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   const inputEmail = screen.getByTestId(TestIdEmailInput);
  //   const inputPassword = screen.getByTestId(TestIdPasswordInput);
  //   const buttonLogin = screen.getByTestId(TestIdButtonLogin);

  //   userEvent.type(inputEmail, TestIdEmail);
  //   userEvent.type(inputPassword, TestIdPassword);
  //   userEvent.click(buttonLogin);

  //   const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);

  //   userEvent.click(buttonIconProfile);

  //   localStorage.clear();
  //   // localStorage.removeItem('user');

  //   const userEmailEmpty = screen.getByTestId('profile-email');

  //   expect(userEmailEmpty).toReturn('');
  //   expect(userEmailEmpty).toBeInTheDocument();

  //   expect(history.location.pathname).toBe('/profile');
  // });

  test('3 <Profile> Se página renderiza components corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestIdEmail);
    userEvent.type(inputPassword, TestIdPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);

    userEvent.click(buttonIconProfile);

    const userEmail = screen.getByText(/test@example\.com/i);
    const buttonDoneRecipes = screen.getByTestId(TestIdButtonDoneRecipes);
    const buttonFavoriteRecipes = screen.getByTestId(TestIdButtonFavoriteRecipes);
    const buttonLogout = screen.getByTestId(TestIdButtonLogout);

    expect(userEmail).toHaveTextContent(/test@example.com/i);
    expect(userEmail).toBeInTheDocument();

    expect(buttonDoneRecipes).toBeVisible();
    expect(buttonDoneRecipes).toBeInTheDocument();

    expect(buttonFavoriteRecipes).toBeVisible();
    expect(buttonFavoriteRecipes).toBeInTheDocument();

    expect(buttonLogout).toBeVisible();
    expect(buttonLogout).toBeInTheDocument();

    expect(history.location.pathname).toBe('/profile');
  });

  test('4 <Profile> Se component <Done Recipes> renderiza rota corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestIdEmail);
    userEvent.type(inputPassword, TestIdPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);
    userEvent.click(buttonIconProfile);

    const buttonDoneRecipes = screen.getByTestId(TestIdButtonDoneRecipes);

    userEvent.click(buttonDoneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('5 <Profile> Se component <Favorite Recipes> renderiza rota corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestIdEmail);
    userEvent.type(inputPassword, TestIdPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);
    userEvent.click(buttonIconProfile);

    const buttonFavoriteRecipes = screen.getByTestId(TestIdButtonFavoriteRecipes);

    userEvent.click(buttonFavoriteRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('6 <Profile> Se component <Logout> renderiza rota corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestIdEmail);
    userEvent.type(inputPassword, TestIdPassword);
    userEvent.click(buttonLogin);

    const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);
    userEvent.click(buttonIconProfile);

    const buttonLogout = screen.getByTestId(TestIdButtonLogout);

    userEvent.click(buttonLogout);

    expect(history.location.pathname).toBe('/');
  });

  // test('3 <Profile> Se página renderiza components corretamente', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   const inputEmail = screen.getByTestId(TestIdEmailInput);
  //   const inputPassword = screen.getByTestId(TestIdPasswordInput);
  //   const buttonLogin = screen.getByTestId(TestIdButtonLogin);

  //   userEvent.type(inputEmail, TestIdEmail);
  //   userEvent.type(inputPassword, TestIdPassword);
  //   userEvent.click(buttonLogin);

  //   const buttonIconProfile = screen.getByTestId(TestIdButtonIconProfile);

  //   userEvent.click(buttonIconProfile);

  //   expect(buttonIconProfile).toBeVisible();
  //   expect(buttonIconProfile).toBeInTheDocument();
  //   expect(history.location.pathname).toBe('/profile');
  // });
  // npm run test-coverage -- --collectCoverageFrom=src/pages/Profile.js
  // npm run test Profile.test.js
});

// Testes Profile: Jéssica Pironato e Patrick Fonseca;
