import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';
// import mockFetchMeals from './helpers/mockFetchMeals';

describe('.: Testa component <SearchBar> :.', () => {
  // afterEach(() => jest.clearAllMocks());

  // beforeEach(() => {
  //   global.fetch = jest.fn(mockFetchMeals);
  // });

  const TestEmail = 'test@example.com';
  const TestPassword = 'app123456';
  const TestIngredient = 'flour';

  const TestIdEmailInput = 'email-input';
  const TestIdPasswordInput = 'password-input';
  const TestIdButtonLogin = 'login-submit-btn';
  const TestIdButtonIconSearch = 'search-top-btn';
  const TestIdRadioIngredient = 'ingredient-search-radio';
  const TestIdRadioName = 'name-search-radio';
  const TestIdRadioFirstLetter = 'first-letter-search-radio';
  const TestIdSearchBar = 'search-input';
  // const TestIdSearchBarButton = 'exec-search-btn';

  const TestAlertByName = 'Sorry, we haven\'t found any recipes for these filters.';
  const TestAlertByFirstLetter = 'Your search must have only 1 (one) character';

  const TestIdBtnIconDrinks = 'drinks-bottom-btn';

  test('1 <SearchBar> Se component <input> renderiza corretamente', () => {
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

  test('2 <SearchBar> Se components <radio> renderiza corretamente', () => {
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

    const radioIngredient = screen.getByTestId(TestIdRadioIngredient);
    const radioName = screen.getByTestId(TestIdRadioName);
    const radioFirstLetter = screen.getByTestId(TestIdRadioFirstLetter);

    expect(radioIngredient).toBeVisible();
    expect(radioIngredient).toBeInTheDocument();

    expect(radioName).toBeVisible();
    expect(radioName).toBeInTheDocument();

    expect(radioFirstLetter).toBeVisible();
    expect(radioFirstLetter).toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals');
  });

  test('3 <SearchBar> Se components retornam dados corretamente', () => {
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

    const radioIngredient = screen.getByTestId(TestIdRadioIngredient);
    const buttonSearchBar = screen.getByText(/search/i);

    userEvent.type(searchInputShow, TestIngredient);
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearchBar);

    screen.logTestingPlaygroundURL();

    const resultFlour = screen.getByRole('img', {
      name: /meals icon/i,
    });

    expect(resultFlour).toBeVisible();

    expect(history.location.pathname).toBe('/meals');
  });

  test('4 <SearchBar> Se filtro em Meals <First Letter> retorna alerta corretamente', async () => {
    renderWithRouterAndRedux(<App />);

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

    const radioFirstLetter = screen.getByTestId(TestIdRadioFirstLetter);
    const buttonSearchBar = screen.getByText(/search/i);

    userEvent.type(searchInputShow, TestIngredient);
    userEvent.click(radioFirstLetter);
    userEvent.click(buttonSearchBar);

    waitFor(() => {
      expect(screen.getByText(TestAlertByFirstLetter)).toBeVisible();
    });
  });

  test('5 <SearchBar> Se filtro em Meals <Name> retorna alerta corretamente', async () => {
    renderWithRouterAndRedux(<App />);

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

    const radioName = screen.getByTestId(TestIdRadioName);
    const buttonSearchBar = screen.getByText(/search/i);

    userEvent.type(searchInputShow, TestIngredient);
    userEvent.click(radioName);
    userEvent.click(buttonSearchBar);

    waitFor(() => {
      expect(screen.getByText(TestAlertByName)).toBeVisible();
    });
  });

  test('6 <SearchBar> Se filtro em Drink <Fist Letter> retorna alerta corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconDrinks = screen.getByTestId(TestIdBtnIconDrinks);

    userEvent.click(buttonIconDrinks);

    const buttonIconSearch = screen.getByTestId(TestIdButtonIconSearch);

    const searchInputIcon = screen.getByTestId(TestIdButtonIconSearch);
    expect(searchInputIcon).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    userEvent.click(buttonIconSearch);

    const searchInputShow = screen.getByTestId(TestIdSearchBar);
    expect(searchInputShow).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    const radioFirstLetter = screen.getByTestId(TestIdRadioFirstLetter);
    const buttonSearchBar = screen.getByText(/search/i);

    userEvent.type(searchInputShow, TestIngredient);
    userEvent.click(radioFirstLetter);
    userEvent.click(buttonSearchBar);

    waitFor(() => {
      expect(screen.getByText(TestIdRadioFirstLetter)).toBeVisible();
    });
  });

  test('7 <SearchBar> Se filtro em Drink <Name> retorna alerta corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    const buttonIconDrinks = screen.getByTestId(TestIdBtnIconDrinks);

    userEvent.click(buttonIconDrinks);

    const buttonIconSearch = screen.getByTestId(TestIdButtonIconSearch);

    const searchInputIcon = screen.getByTestId(TestIdButtonIconSearch);
    expect(searchInputIcon).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    userEvent.click(buttonIconSearch);

    const searchInputShow = screen.getByTestId(TestIdSearchBar);
    expect(searchInputShow).toBeVisible();
    expect(buttonIconSearch).toBeInTheDocument();

    const radioByName = screen.getByTestId(TestIdRadioName);
    const buttonSearchBar = screen.getByText(/search/i);

    userEvent.type(searchInputShow, TestIngredient);
    userEvent.click(radioByName);
    userEvent.click(buttonSearchBar);

    waitFor(() => {
      expect(screen.getByText(TestAlertByName)).toBeVisible();
    });
  });
  // npm run test-coverage -- --collectCoverageFrom=src/components/SearchBar.jsx
  // npm run test SearchBar.test.jsx
});
