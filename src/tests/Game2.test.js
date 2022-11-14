import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { failedMockFetch } from './mocks/fetch';

describe('Testing Game component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(failedMockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Testing if redirects to "/" when fetch fail',async () => {
    const initialState = {
      player: {
        selectedAnswer: false,
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});