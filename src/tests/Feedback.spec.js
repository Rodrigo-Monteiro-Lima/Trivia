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
    
    console.log(pathname)
    expect(pathname).toBe('/Feedback');
  });

  it('Testing if renders in path "/Feedback"', () => {
    const initialState = {
      assertions: 0,
      score: 0,
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/Feedback');    
    const { pathname } = history.location;
    
    console.log(pathname)
    expect(pathname).toBe('/Feedback');
  });
  
  // it('Testing if renders correctly when score is 4', () => {
    
  //   const initialState = {
  //     assertions: 4,
  //     score: 4,
  //   };
    
  //   renderWithRouterAndRedux(<App />, initialState, '/Feedback');
  //   const assertions = screen.getByTestId('feedback-total-question');
  //   const scoreText = screen.getByTestId('feedback-text');
    

  //   expect(assertions.innerHTML).toBe("4");
  //   expect(scoreText.innerHTML).toBe("Well Done!");
  // });

  // it("Testing if don't passing an email or name the button is disabled", () => {
    //   renderWithRouterAndRedux(<App />);
  //   const email = screen.getByPlaceholderText('Email');
  //   const name = screen.getByPlaceholderText('Nome');
  //   const button = screen.getByRole('button', {name: 'Play'});
  //   expect(button).toBeDisabled();
  //   userEvent.type(email, 'email@test.com');
  //   expect(button).toBeDisabled();
  //   userEvent.clear(email);
  //   userEvent.type(name, 'George');
  //   expect(button).toBeDisabled();
  // });

 });
