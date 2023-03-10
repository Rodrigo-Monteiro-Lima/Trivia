import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteQuestion } from '../redux/actions';
import logo from '../logo trivia.png';
import timerIcon from '../assets/timerIcon.svg';
import a from '../assets/a.svg';
import b from '../assets/b.svg';
import c from '../assets/c.svg';
import d from '../assets/squareD.svg';
import v from '../assets/greenV.svg';
import x from '../assets/redX.svg';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      orderedAnswer: [],
      questionHelp: '',
      background: '',
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
    const { questions, index, help } = this.props;
    const thisRound = questions[index];
    const dotFive = 0.5;
    const minusOne = -1;
    const three = 3;
    const wrongAnswers = thisRound.incorrect_answers;
    if (!help) {
      const i = wrongAnswers.length === three
        ? Math.floor(Math.random() * three) : 0;
      this.setState({ questionHelp: wrongAnswers[i] });
    }
    const rightAnswer = thisRound.correct_answer;
    const answersArr = [...wrongAnswers, rightAnswer];
    const randomAnswers = answersArr.sort(() => (Math.random()
    > dotFive ? 1 : minusOne));
    const color = ['#f9ba18', '#00D5E2', 'green', 'darkolivegreen', 'blueviolet'];
    const four = 4;
    const bg = color[Math.floor(Math.random() * four)];
    this.setState({
      orderedAnswer: randomAnswers,
      background: bg,
    });
  };

  handleBtnNext = () => {
    const { handleNext } = this.props;
    this.setState({ questionHelp: '' });
    handleNext();
  };

  render() {
    const { orderedAnswer, questionHelp, background } = this.state;
    const { questions,
      index,
      onSelectQuestion,
      selectedAnswer, disabled, seconds,
      help, removeQuestion } = this.props;
    const thisRound = questions[index];
    const rightAnswer = thisRound.correct_answer;
    const opt = [a, b, c, d];
    return (
      <div className="main-container">
        <div className="questions-answer-container">
          <div className="question-container">
            <img src={ logo } alt="logo" className="logo" />
            <h2
              data-testid="question-category"
              className="category"
              style={ { background: `${background}` } }
            >
              {decodeURIComponent(thisRound.category)}
            </h2>
            <h3 data-testid="question-text" className="text">
              {decodeURIComponent(thisRound.question)}
            </h3>

            <div className="timerContainer">
              <img src={ timerIcon } alt="timer icon" />
              <p className="timer">
                &nbsp;&nbsp;
                {`Timer: ${seconds}s`}
              </p>
            </div>

          </div>
          <div data-testid="answer-options" className="answer-options">
            <div className="buttons-container">
              {orderedAnswer.map((answer, i) => (
                answer !== rightAnswer
                  ? (
                    <button
                      key={ i }
                      type="button"
                      data-testid={ `wrong-answer-${i}` }
                      disabled={ disabled }
                      className={ `${selectedAnswer && rightAnswer !== answer
                        ? 'wrong' : 'option'} ${questionHelp === answer
                        && help ? 'hide' : ''}` }
                      onClick={ () => onSelectQuestion(answer) }
                    >
                      <img
                        src={ selectedAnswer && rightAnswer !== answer ? x : opt[i] }
                        alt=""
                        className="opt"
                      />
                      {decodeURIComponent(answer)}
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
                      <img
                        src={ selectedAnswer && rightAnswer === answer ? v : opt[i] }
                        alt=""
                        className="opt"
                      />
                      {decodeURIComponent(answer)}
                    </button>)
              ))}
            </div>
            <div className="next-btn">
              {selectedAnswer ? (
                <button
                  type="button"
                  data-testid="btn-next"
                  className="green-btn next"
                  onClick={ () => this.handleBtnNext() }
                >
                  NEXT
                </button>)
                : !help
                  && (
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={ () => removeQuestion() }
                    >
                      HELP
                    </button>)}
            </div>
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
  seconds: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  help: PropTypes.bool.isRequired,
  removeQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player: { help } }) => ({
  help,
});

const mapDispatchToProps = (dispatch) => ({
  removeQuestion: () => dispatch(deleteQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
