import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from '../logo trivia.png';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      orderedAnswer: [],
    };
  }

  componentDidMount() {
    this.handleQuestions();
  }

  componentDidUpdate(prevProps) {
    const { index } = this.props;
    if (prevProps.index !== index) {
      this.handleQuestions();
    }
  }

  handleQuestions = () => {
    const { questions, index } = this.props;
    const thisRound = questions[index];
    const dotFive = 0.5;
    const minusOne = -1;
    const wrongAnwswers = thisRound.incorrect_answers;
    const rightAnswer = thisRound.correct_answer;
    const answersArr = [...wrongAnwswers, rightAnswer];
    const randomAnswers = answersArr.sort(() => (Math.random()
    > dotFive ? 1 : minusOne));
    this.setState({
      orderedAnswer: randomAnswers,
    });
  };

  render() {
    const { orderedAnswer } = this.state;
    const { questions, index, onSelectQuestion, selectedAnswer, disabled } = this.props;
    const thisRound = questions[index];
    const rightAnswer = thisRound.correct_answer;
    return (
      <div className="main-container">
        {/* <img src={ logo } alt="logo" className="logo" /> */}
        <div className="questions-answer-container">
          <div className="question-container">
            <h2
              data-testid="question-category"
              className="category"
            >
              {thisRound.category}
            </h2>
            <h3 data-testid="question-text" className="text">{thisRound.question}</h3>
          </div>
          <div data-testid="answer-options" className="answer-options">
            {orderedAnswer.map((answer, i) => (
              answer !== rightAnswer
                ? (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    disabled={ disabled }
                    className={ `${selectedAnswer && rightAnswer !== answer
                      ? 'wrong' : 'option'}` }
                    onClick={ () => onSelectQuestion(answer) }
                  >
                    {answer}
                  </button>)
                : (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                    disabled={ disabled }
                    className={ `${selectedAnswer ? 'correct' : 'option'}` }
                    onClick={ () => onSelectQuestion(answer) }
                  >
                    {answer}
                  </button>)
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  index: PropTypes.number.isRequired,
  onSelectQuestion: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Questions;
