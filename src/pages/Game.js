import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, checkAnswer, nextQuestion, timeOut } from '../redux/actions';
import getQuestions from '../services/questionsAPI';
import './Game.css';
import Questions from '../components/Questions';
import Footer from '../components/Footer';

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
    this.setState({ seconds: 30, disabled: false });
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
    const { check, selectedAnswer } = this.props;
    const { round, questions, seconds } = this.state;
    if (!selectedAnswer) {
      clearInterval(this.timerID);
      clearTimeout(this.timeoutID);
      const answer = questions[round].correct_answer;
      const difficulty = this.handleDifficulty(questions[round].difficulty);
      const points = seconds * difficulty;
      check(option, answer, points);
    }
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
    const { time } = this.props;
    this.timerID = setInterval(() => this.setState((prev) => ({
      seconds: prev.seconds - 1,
    })), ONE_SECOND);
    this.timeoutID = setTimeout(() => {
      clearInterval(this.timerID);
      this.setState({ seconds: 30, disabled: true });
      time();
    }, THIRTY_SECONDS);
  };

  render() {
    // const { fetching } = this.props;
    const { selectedAnswer, history } = this.props;
    const { round, questions, fetching, seconds, disabled } = this.state;
    if (fetching) return <p>Loading...</p>;
    // if (error) return this.invalidToken();
    return (
      <div className="game-container">
        <Header history={ history } />
        {!fetching && questions.length !== 0
        && (
          <>
            <Questions
              seconds={ seconds }
              questions={ questions }
              index={ round }
              onSelectQuestion={ this.onSelectQuestion }
              disabled={ disabled }
              selectedAnswer={ selectedAnswer }
              handleNext={ this.handleNext }
            />
            {/* <p>{`Tempo: ${seconds}s`}</p> */}
            {/* {selectedAnswer && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.handleNext() }
              >
                Next
              </button>
            )} */}
            <Footer />
          </>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  fecthAPI: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  time: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  selectedAnswer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ player }) => ({
  questions: player.questions,
  selectedAnswer: player.selectedAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  check: (option, answer, points) => dispatch(checkAnswer(option, answer, points)),
  fecthAPI: (token) => dispatch(fetchQuestions(token)),
  next: () => dispatch(nextQuestion()),
  time: () => dispatch(timeOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
