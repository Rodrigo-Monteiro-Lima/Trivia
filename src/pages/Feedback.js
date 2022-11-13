import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;

    return (
      <>
        <Header />
        <main>
          <h1 data-testid="feedback-text">
            { assertions > 2
              ? 'Well Done!' : 'Could be better...' }
          </h1>
          {/* <h1 data-testid="feedback-text">
      { assertions >= three
        ? 'Well Done!' : 'Could be better...' }
    </h1> */}
          <h3 data-testid="feedback-total-question">{ assertions }</h3>
          <h3 data-testid="feedback-total-score">{ score }</h3>
        </main>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
// dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  // questions: player.questions,
  // selectedAnswer: player.selectedAnswer,
  // error: player.error,
  // fetching: player.isFetching,
  // question: player.questions[0].question,
});

export default connect(mapStateToProps)(Feedback);
