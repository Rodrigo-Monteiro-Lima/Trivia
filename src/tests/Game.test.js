import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockFetch } from './mocks/fetch';

jest.setTimeout(50000);

describe('Testing Game component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Testing if starts with loading element', () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
      }
    };
    renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
  it('Testing if renders correctly',async () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
        score: 0,
      }
    };
    renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const name = screen.getByTestId('header-player-name')
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('rodrigo');
    const score = screen.getByTestId('header-score')
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'user avatar');
    expect(img).toHaveAttribute('src', 'https://www.gravatar.com/avatar/f1f97cfa813c828a73528989da671a81');
    const category = screen.getByTestId('question-category')
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Geography');
    const question = screen.getByTestId('question-text')
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent('The Republic of Malta is the smallest microstate worldwide.');
    const timer = screen.getByText('30');
    expect(timer).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    const wrongAnswer = screen.getByTestId(/wrong-answer/i);
    expect(wrongAnswer).toBeInTheDocument();
    expect(wrongAnswer).toHaveTextContent('True');
    const rightAnswer = screen.getByTestId('correct-answer');
    expect(rightAnswer).toBeInTheDocument();
    expect(rightAnswer).toHaveTextContent('False');
  });
  it('Testing when a option is selected, the button next appear on the screen',async () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
        score: 0,
      }
    };
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const nextBtn = screen.queryByRole('button', {name: 'Next'});
    expect(nextBtn).not.toBeInTheDocument();
    const rightAnswer = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer);
    const next = screen.queryByRole('button', {name: 'Next'});
    expect(next).toBeInTheDocument();
    const score = await screen.findByTestId('header-score')
    expect(score).toHaveTextContent('40');
    expect(store.getState().player.selectedAnswer).toBeTruthy();
  });
  it('Testing if afer 30s all options are disabled',async () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
        score: 0,
      }
    };
    renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const buttons = screen.getAllByRole('button');
    await new Promise((test) => setTimeout(test, 30000));
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
  it('Testing when the next button is clicked, renders a new question',async () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
        score: 0,
      }
    };
    renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const wrongAnswer = screen.getByTestId(/wrong-answer/i);
    userEvent.click(wrongAnswer);
    const nextBtn = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn);
    const next = screen.queryByRole('button', {name: 'Next'});
    expect(next).not.toBeInTheDocument();
    const category = screen.getByTestId('question-category')
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Science & Nature');
    const question = screen.getByTestId('question-text')
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    const rightAnswer = screen.getByTestId('correct-answer');
    expect(rightAnswer).toBeInTheDocument();
    expect(rightAnswer).toHaveTextContent('Graviton');
    const wrongAnswers = screen.getAllByTestId(/wrong-answer/i);
    expect(wrongAnswers).toHaveLength(3);
  });
  it('Testing if afer all questions be answered, the next button redirect to "/Feedback" ',async () => {
    const initialState = {
      player: {
        name: 'rodrigo',
        gravatarEmail: 'email@test.com',
        selectedAnswer: false,
        score: 0,
        assertions: 0,
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Game');
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
    const rightAnswer = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer);
    const nextBtn = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn);
    const rightAnswer2 = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer2);
    const nextBtn2 = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn2);
    const rightAnswer3 = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer3);
    const nextBtn3 = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn3);
    const rightAnswer4 = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer4);
    const nextBtn4 = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn4);
    const rightAnswer5 = screen.getByTestId('correct-answer');
    userEvent.click(rightAnswer5);
    const nextBtn5 = screen.queryByRole('button', {name: 'Next'});
    userEvent.click(nextBtn5);
    const { pathname } = history.location;
    expect(pathname).toBe('/Feedback');
    const text = await screen.findByTestId('feedback-text')
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Well Done!')
    const score = await screen.findByTestId('header-score')
    expect(score).toHaveTextContent('350');
  });
});