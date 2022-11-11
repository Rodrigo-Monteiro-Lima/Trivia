import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, checkAnswer } from '../redux/actions';
import getQuestions from '../services/questionsAPI';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      round: 0,
      questions: [],
      fetching: true,
    };
  }

  async componentDidMount() {
    const { fecthAPI, history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
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

  onSelectQuestion = (option) => {
    const { check } = this.props;
    const { round, questions } = this.state;
    const answer = questions[round].correct_answer;
    check(option, answer);
  };

  render() {
    // const { fetching } = this.props;
    const { selectedAnswer } = this.props;
    const { round, questions, fetching } = this.state;
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
            <div data-testid="answer-options">
              {randomAnswers.map((button) => button)}
            </div>
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
  check: (option, answer) => dispatch(checkAnswer(option, answer)),
  fecthAPI: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
