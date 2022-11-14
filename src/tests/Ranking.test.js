import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'; 

const localStorageMock = (() => {
  let store = {'ranking': '[{"name": "rodrigo", "score": "350", "gravatarImg": ""}]'}

  return {
    getItem: (key) => {
      return store[key] || null
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

describe(`Testa a página "Ranking"`, () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock
    });
  });
  it(`Testa se tem pelo menos um botão na tela`, () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const homeButton = screen.getByTestId('btn-go-home')
    expect(homeButton).toHaveTextContent('Home')
    expect(homeButton).toBeInTheDocument();
  });
  it(`Testa se ao clicar no botão "Home", volta para página de login`, () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const homeButton = screen.getByTestId('btn-go-home')
    userEvent.click(homeButton);

    expect(history.location.pathname).toBe('/');
  });
  it('Testing if renders correctly', () => {
    const initialState = {};
    renderWithRouterAndRedux(<App />, initialState, '/ranking');    
    const name = screen.getByTestId('player-name-0');    
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('rodrigo');
    const score = screen.getByTestId('player-score-0');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('350');
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'rodrigo');
    expect(img).toHaveAttribute('src', '');
  });
});