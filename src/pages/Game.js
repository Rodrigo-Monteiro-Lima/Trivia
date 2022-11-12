import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, checkAnswer, nextQuestion } from '../redux/actions';
import getQuestions from '../services/questionsAPI';
import './Game.css';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;
class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      round: 0,
      questions: [],
      fetching: true,
      seconds: 30,
      disabled: false,
    };
  }

  async componentDidMount() {
    const { fecthAPI, history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    this.seconds();
    if (questions.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: questions.results,
      fetching: false,
    });
    fecthAPI(token);
  }

  // invalidToken = () => {
  //   const { history } = this.props;
  //   localStorage.removeItem('token');
  //   history.push('/');
  // };

  handleNext = () => {
    const { next, history } = this.props;
    const { questions, round } = this.state;
    this.setState({ seconds: 30 });
    if (round === questions.length - 1) {
      history.push('/Feedback');
    } else {
      this.setState((estadoAnterior) => ({
        round: estadoAnterior.round + 1,
      }));
    }
    next();
    this.seconds();
  };

  onSelectQuestion = (option) => {
    const { check } = this.props;
    const { round, questions, seconds } = this.state;
    clearInterval(this.timerID);
    clearTimeout(this.timeoutID);
    const answer = questions[round].correct_answer;
    const difficulty = this.handleDifficulty(questions[round].difficulty);
    const points = seconds * difficulty;
    check(option, answer, points);
  };

  handleDifficulty = (difficulty) => {
    const one = 1;
    const two = 2;
    const three = 3;
    switch (difficulty) {
    case 'hard':
      return three;
    case 'medium':
      return two;
    default:
      return one;
    }
  };

  seconds = () => {
    this.timerID = setInterval(() => this.setState((prev) => ({
      seconds: prev.seconds - 1,
    })), ONE_SECOND);
    this.timeoutID = setTimeout(() => {
      clearInterval(this.timerID);
      this.setState({ seconds: 30, disabled: true });
    }, THIRTY_SECONDS);
  };

  render() {
    // const { fetching } = this.props;
    const { selectedAnswer } = this.props;
    const { round, questions, fetching, seconds, disabled } = this.state;
    // console.log(error);
    if (fetching) return <p>Loading...</p>;
    // if (error) return this.invalidToken();
    const thisRound = questions[round];
    const dotFive = 0.5;
    const minusOne = -1;
    const wrongAnwswers = thisRound.incorrect_answers;
    const rightAnswer = thisRound.correct_answer;
    const wrongButtons = wrongAnwswers.map((answer, i) => (
      <button
        type="button"
        key={ i }
        data-testid={ `wrong-answer${i}` }
        onClick={ () => this.onSelectQuestion(answer) }
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
        onClick={ () => this.onSelectQuestion(rightAnswer) }
        className={ `${selectedAnswer ? 'correct' : ''}` }
        disabled={ disabled }
      >
        {rightAnswer}
      </button>);

    const answersArr = [...wrongButtons, rightButton];
    const randomAnswers = answersArr.sort(() => (Math.random()
    > dotFive ? 1 : minusOne));
    return (
      <>
        <Header />
        {!fetching && questions.length !== 0
        && (
          <>
            <h2 data-testid="question-category">{thisRound.category}</h2>
            <h3 data-testid="question-text">{thisRound.question}</h3>
            <p>{seconds}</p>
            <div data-testid="answer-options">
              {randomAnswers.map((button) => button)}
            </div>
            {selectedAnswer && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.handleNext() }
              >
                Next
              </button>
            )}
          </>
        )}
      </>
    );
  }
}

Game.propTypes = {
  fecthAPI: PropTypes.func.isRequired,
  // questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  check: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // error: PropTypes.bool.isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
  // fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ player }) => ({
  questions: player.questions,
  selectedAnswer: player.selectedAnswer,
  // error: player.error,
  // fetching: player.isFetching,
  // question: player.questions[0].question,
});

const mapDispatchToProps = (dispatch) => ({
  check: (option, answer, points) => dispatch(checkAnswer(option, answer, points)),
  fecthAPI: (token) => dispatch(fetchQuestions(token)),
  next: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
