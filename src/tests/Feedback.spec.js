import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';

describe('Testing Feedback component', () => {
  
  it('Testing if renders correctly when all scores are 0', () => {
    
    renderWithRouterAndRedux(<Feedback />);    
    const score = screen.getByTestId('feedback-total-score')
    const assertions = screen.getByTestId('feedback-total-question')
    const scoreText = screen.getByTestId('feedback-text');
    
    expect(score.innerHTML).toBe("0");
    expect(assertions.innerHTML).toBe("0");
    expect(scoreText.innerHTML).toBe("Could be better...");
  });
  
  
  it('Testing if renders in path "/Feedback"', () => {
    const initialState = {
      assertions: 0,
      score: 0,
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Feedback');    
    const { pathname } = history.location;
    
    expect(pathname).toBe('/Feedback');
  });

  it('Testing if renders in path "/Feedback"', () => {
    const initialState = {
      assertions: 0,
      score: 0,
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Feedback');    
    const { pathname } = history.location;
    
    expect(pathname).toBe('/Feedback');
  });
  
  it('Testing if renders correctly when score is 4', async () => {
    
    const initialState = {
      player: {
        assertions: 4,
        score: 4,
      }
    };
    
    renderWithRouterAndRedux(<App />, initialState, '/Feedback');
    const assertions = screen.getByTestId('feedback-total-question');
    const scoreText = screen.getByTestId('feedback-text');

    expect(assertions.innerHTML).toBe("4");
    expect(scoreText.innerHTML).toBe("Well Done!");
  });

  it("Testing if button 'Play Again' redirect to '/'", () => {
    const initialState = {
      player: {
        assertions: 4,
        score: 4,
      }
    };
    
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Feedback');
    const btnPlayAgain = screen.getByRole('button', {name: 'Play Again'}) 
    expect(btnPlayAgain).toHaveAttribute('data-testid', 'btn-play-again');
    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;    
    expect(pathname).toBe('/');
  });
  it("Testing if button 'Ranking' redirect to '/ranking'", () => {
    const initialState = {
      player: {
        assertions: 4,
        score: 4,
      }
    };
    
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Feedback');
    const btnRanking = screen.getByRole('button', {name: 'Ranking'}) 
    expect(btnRanking).toHaveAttribute('data-testid', 'btn-ranking');
    userEvent.click(btnRanking);
    const { pathname } = history.location;    
    expect(pathname).toBe('/ranking');
  });

 });
