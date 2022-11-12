import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'; 

describe(`Testa a página "Ranking"`, () => {
  it(`Testa se tem pelo menos um botão na tela`, () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const homeButton = screen.getByTestId('btn-go-home')

    expect(homeButton).toBeInTheDocument();
  })

  it(`Testa se ao clicar no botão "Home", volta para página de login`, () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/ranking');
    });

    const homeButton = screen.getByTestId('btn-go-home')
    userEvent.click(homeButton);

    expect(history.location.pathname).toBe('/');
  })
})