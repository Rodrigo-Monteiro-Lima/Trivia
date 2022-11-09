import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const mockFetch = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6'

describe('Testing App component', () => {
  it('Testing if renders in path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testing if renders correctly', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveProperty('type', 'email');
    expect(email).toHaveAttribute('data-testid', 'input-gravatar-email');
    const name = screen.getByPlaceholderText('Nome');
    expect(name).toBeInTheDocument();
    expect(name).toHaveProperty('type', 'text');
    expect(name).toHaveAttribute('data-testid', 'input-player-name');
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent('Play');
    expect(buttons[0]).toHaveAttribute('data-testid', 'btn-play');
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toHaveTextContent('Configurações');
    expect(buttons[1]).toHaveAttribute('data-testid', 'btn-settings');
  });
  it("Testing if don't passing an email or name the button is disabled", () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');
    const button = screen.getByRole('button', {name: 'Play'});
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@test.com');
    expect(button).toBeDisabled();
    userEvent.clear(email);
    userEvent.type(name, 'George');
    expect(button).toBeDisabled();

  });
  it('Testing if passing email and name the button is enabled', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');
    const button = screen.getByRole('button', {name: 'Play'});
    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(name, 'Lucas');
    expect(button).toBeEnabled();
  });
  it('Testing fetching token api', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');
    const button = screen.getByRole('button', {name: 'Play'});
    userEvent.type(email, 'alguem@alguem.com');
    userEvent.type(name, 'Lucas');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetch),
    });
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testing config button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', {name: 'Configurações'})
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
})