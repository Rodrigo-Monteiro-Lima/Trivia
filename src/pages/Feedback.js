import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  // state = {
  //   newRankObj: {},
  //   prevRank: [],
  //   newRank: [],
  // };

  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;

    const userEmail = gravatarEmail;
    const emailHash = md5(userEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${emailHash}`;

    const addPlayer = {
      name,
      score,
      gravatarImg,
    };
    console.log(addPlayer);

    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
      // localStorage.setItem('ranking', [addPlayer]);
    }
    console.log(JSON.parse(localStorage.getItem('ranking')));
    console.log(localStorage.getItem('ranking'));

    const prevRanking = JSON.parse(localStorage.getItem('ranking'));
    // const prevRanking = localStorage.getItem('ranking');
    console.log(JSON.parse(localStorage.getItem('ranking')));
    // console.log(localStorage.getItem('ranking'));

    localStorage.setItem('ranking', JSON.stringify([...prevRanking, addPlayer]));
    // localStorage.setItem('ranking', [...prevRanking, addPlayer]);
    console.log(JSON.parse(localStorage.getItem('ranking')));
  }

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
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
// dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  // questions: player.questions,
  // selectedAnswer: player.selectedAnswer,
  // error: player.error,
  // fetching: player.isFetching,
  // question: player.questions[0].question,
});

export default connect(mapStateToProps)(Feedback);
