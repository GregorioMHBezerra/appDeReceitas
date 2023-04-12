import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './utils/rwrar';

describe('.: Testa página <Login> :.', () => {
  const TestEmail = 'test@example.com';
  const TestEmailIncomplete = 'email';

  const TestPassword = 'app123456';
  const TestPasswordIncomplete = '2';

  const TestIdEmailInput = 'email-input';
  const TestIdPasswordInput = 'password-input';
  const TestIdButtonLogin = 'login-submit-btn';

  test('1 <Login> Se página renderiza rota /', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  test('2 <Login> Se página renderiza components corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();

    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();

    expect(buttonLogin).toBeDisabled();
    expect(buttonLogin).toBeInTheDocument();
  });

  test('3 <Login> Se página reconhece inserção de dados incorretos', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmailIncomplete);
    userEvent.type(inputPassword, TestPasswordIncomplete);
    userEvent.click(buttonLogin);

    expect(buttonLogin).toBeDisabled();
    expect(history.location.pathname).toBe('/');
  });

  test('4 <Login> Se página reconhece inserção faz login corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(TestIdEmailInput);
    const inputPassword = screen.getByTestId(TestIdPasswordInput);
    const buttonLogin = screen.getByTestId(TestIdButtonLogin);

    userEvent.type(inputEmail, TestEmail);
    userEvent.type(inputPassword, TestPassword);
    userEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/meals');
  });
  // npm run test-coverage -- --collectCoverageFrom=src/pages/Login.js
  // npm run test Login.test.js
});
