import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';

describe('Testes Login', () => {
  const email = 'alguem@email.com';
  const password = 'coxinha123';
  const emailTestID = 'email-input';
  const passwordTestID = 'password-input';
  const searchTopBtn = 'search-top-btn';
  const profileTopBtn = 'profile-top-btn';

  it('1.Testa inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const buttonLogin = screen.getByRole('button', { name: 'Enter' });
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    expect(buttonLogin).not.toBeDisabled();
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');

    const buttonProfile = screen.getByTestId(profileTopBtn);
    expect(buttonProfile).toBeInTheDocument();

    userEvent.type(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  it('2.Testa se o search renderiza corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const buttonLogin = screen.getByRole('button', { name: 'Enter' });
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    expect(buttonLogin).not.toBeDisabled();
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');

    const searchIcon = screen.getByTestId(searchTopBtn);
    expect(searchIcon).toBeVisible();
    userEvent.click(searchIcon);

    waitFor(() => {
      const searchInput = screen.getByTestId(searchTopBtn);
      expect(searchInput).toBeVisible();
      // userEvent.click(searchIcon);
      // expect(searchInput).not.toBeVisible();
    });
  });

  it('3. Testa SearchBar na rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: 'Enter' });
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/meals');

    const buttonSearchBar = screen.getByTestId(searchTopBtn);
    expect(buttonSearchBar).toBeVisible();
    userEvent.click(buttonSearchBar);

    const searchInput = await screen.findByTestId('search-input');
    const inputSearch = 'flour';
    await waitFor(() => expect(searchInput).toBeVisible());
    userEvent.type(searchInput, inputSearch);

    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    const firstLetterRadioButton = screen.getByTestId('first-letter-search-radio');
    const nameRadioButton = screen.getByTestId('name-search-radio');

    expect(ingredientRadioButton).toBeInTheDocument();
    expect(ingredientRadioButton).not.toBeChecked();

    await waitFor(() => expect(buttonSearchBar).toBeVisible());
    userEvent.click(firstLetterRadioButton);

    const buttonSearchFilter = screen.getByTestId('exec-search-btn');
    await waitFor(() => expect(buttonSearchFilter).toBeVisible());
    userEvent.click(buttonSearchFilter);

    await waitFor(() => {
      const mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => 'Your search must have only 1 (one) character');
      expect(mockAlert).not.toHaveBeenCalled();
    });

    await waitFor(() => expect(searchInput).toBeVisible());
    userEvent.clear(searchInput);
    userEvent.type(searchInput, inputSearch);

    expect(nameRadioButton).toBeInTheDocument();
    userEvent.click(nameRadioButton);

    await waitFor(() => expect(buttonSearchFilter).toBeVisible());
    userEvent.click(buttonSearchFilter);

    await waitFor(() => {
      const mockAlertNotFound = jest.spyOn(global, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');
      expect(mockAlertNotFound).toHaveBeenCalledTimes(1);
    });
  });

  it('4.Testa SearchBar na rota /drink', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonLogin = screen.getByRole('button', { name: 'Enter' });
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonLogin);

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(buttonDrink);

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearchBar = screen.getByTestId(searchTopBtn);
    expect(buttonSearchBar).toBeInTheDocument();

    userEvent.click(buttonSearchBar);
    const searchInput = await screen.findByTestId('search-input');
    const inputDrink = 'vodka';
    const inputDrink2 = 'gin';

    waitFor(() => {
      userEvent.type(searchInput, inputDrink);
      expect(screen.getByText('vodka')).toBeInTheDocument();
    });
    waitFor(() => {
      userEvent.type(searchInput, inputDrink2);
      expect(screen.getByText('gin')).toBeInTheDocument();
    });
  });
  it('5.Testa Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email2 = 'alguem@email.com';
    const password2 = 'coxinha123';
    const buttonLogin2 = screen.getByRole('button', { name: 'Enter' });
    const emailInput2 = screen.getByTestId(emailTestID);
    const passwordInput2 = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput2, email2);
    userEvent.type(passwordInput2, password2);
    userEvent.click(buttonLogin2);
    expect(history.location.pathname).toBe('/meals');
    const profileBtn = screen.getByTestId(profileTopBtn);
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
  it('6.Testa botões Favorite Recipes do componente Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email2 = 'teste@gmail.com';
    const password2 = 'xablau123';
    const buttonLogin2 = screen.getByRole('button', { name: 'Enter' });
    const emailInput2 = screen.getByTestId(emailTestID);
    const passwordInput2 = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput2, email2);
    userEvent.type(passwordInput2, password2);
    userEvent.click(buttonLogin2);
    expect(history.location.pathname).toBe('/meals');
    const profileBtn = screen.getByTestId(profileTopBtn);
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('7.Testa botão Done Recipes do componente Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email2 = 'teste2@email.com';
    const password2 = 'xablau1234';
    const buttonLogin2 = screen.getByRole('button', { name: 'Enter' });
    const emailInput2 = screen.getByTestId(emailTestID);
    const passwordInput2 = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput2, email2);
    userEvent.type(passwordInput2, password2);
    userEvent.click(buttonLogin2);
    expect(history.location.pathname).toBe('/meals');
    const profileBtn = screen.getByTestId(profileTopBtn);
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('8.Testa botão Done Recipes do componente Profile', () => {
    renderWithRouterAndRedux(<App />);

    const email2 = 'teste2@email.com';
    const password2 = 'xablau1234';
    const buttonLogin2 = screen.getByRole('button', { name: 'Enter' });
    const emailInput2 = screen.getByTestId(emailTestID);
    const passwordInput2 = screen.getByTestId(passwordTestID);
    userEvent.type(emailInput2, email2);
    userEvent.type(passwordInput2, password2);
    userEvent.click(buttonLogin2);
    const profileBtn = screen.getByTestId(profileTopBtn);
    userEvent.click(profileBtn);

    localStorage.clear();

    userEvent.click(profileBtn);
    // const result = getLocalStorageUSer();
    // expect(result).toEqual('');
  });
});

// Requisito 2-6: group Programming André Porto,Gregório Bezerra,Jéssica Pironato, Josiane Oliveira, Patrick Fonseca;
// Requisito 12-15: Pair Programming André Porto,Gregório Bezerra
