import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: '',
  //     email: '',
  //     isBtnDisabled: true,
  //   };
  // }

  render() {
    const { assertions, score } = this.props;
    const three = 3;

    return (
      <main>
        <h1 data-testid="feedback-text">
          { assertions >= three
            ? 'Well Done!' : 'Could be better...' }
        </h1>
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
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
