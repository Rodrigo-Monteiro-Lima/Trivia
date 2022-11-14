import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      orderedAnswer: [],
    };
  }

  componentDidMount() {
    const { questions, index, onSelectQuestion, selectedAnswer, disabled } = this.props;
    const thisRound = questions[index];
    const dotFive = 0.5;
    const minusOne = -1;
    const wrongAnwswers = thisRound.incorrect_answers;
    const rightAnswer = thisRound.correct_answer;
    const wrongButtons = wrongAnwswers.map((answer, i) => (
      <button
        type="button"
        key={ i }
        data-testid={ `wrong-answer${i}` }
        onClick={ () => onSelectQuestion(answer) }
        className={ `${selectedAnswer && rightAnswer !== answer ? 'wrong' : ''}` }
        disabled={ disabled }
      >
        {answer}
      </button>
    ));
    const rightButton = (
      <button
        type="button"
        key={ wrongAnwswers.length }
        data-testid="correct-answer"
        onClick={ () => onSelectQuestion(rightAnswer) }
        className={ `${selectedAnswer ? 'correct' : ''}` }
        disabled={ disabled }
      >
        {rightAnswer}
      </button>);

    const answersArr = [...wrongButtons, rightButton];
    const randomAnswers = answersArr.sort(() => (Math.random()
    > dotFive ? 1 : minusOne));
    this.setState({
      orderedAnswer: randomAnswers,
    });
  }

  render() {
    const { questions, index } = this.props;
    const { orderedAnswer } = this.state;
    const thisRound = questions[index];
    // const dotFive = 0.5;
    // const minusOne = -1;
    // const wrongAnwswers = thisRound.incorrect_answers;
    // const rightAnswer = thisRound.correct_answer;
    // const wrongButtons = wrongAnwswers.map((answer, i) => (
    //   <button
    //     type="button"
    //     key={ i }
    //     data-testid={ `wrong-answer${i}` }
    //     onClick={ () => onSelectQuestion(answer) }
    //     className={ `${selectedAnswer && rightAnswer !== answer ? 'wrong' : ''}` }
    //     disabled={ disabled }
    //   >
    //     {answer}
    //   </button>
    // ));
    // const rightButton = (
    //   <button
    //     type="button"
    //     key={ wrongAnwswers.length }
    //     data-testid="correct-answer"
    //     onClick={ () => onSelectQuestion(rightAnswer) }
    //     className={ `${selectedAnswer ? 'correct' : ''}` }
    //     disabled={ disabled }
    //   >
    //     {rightAnswer}
    //   </button>);

    // const answersArr = [...wrongButtons, rightButton];
    // const randomAnswers = answersArr.sort(() => (Math.random()
    // > dotFive ? 1 : minusOne));
    return (
      <div>
        <h2 data-testid="question-category">{thisRound.category}</h2>
        <h3 data-testid="question-text">{thisRound.question}</h3>
        <div data-testid="answer-options">
          {orderedAnswer.map((button) => button)}
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

// const mapStateToProps = ({ player }) => ({
//   selectedAnswer: player.selectedAnswer,
// });

export default connect()(Questions);
