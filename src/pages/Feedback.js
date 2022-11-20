import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
// import Header from '../components/Header';
import { newGame } from '../redux/actions';
import './Feedback.css';
import logo from '../assets/logo trivia2.png';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const userEmail = gravatarEmail;
    const emailHash = md5(userEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${emailHash}`;
    this.setState({ image: gravatarImg });
    const addPlayer = {
      name,
      score,
      gravatarImg,
    };
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...prevRanking, addPlayer]));
  }

  handleClick = () => {
    const { playAgain, history } = this.props;
    playAgain();
    history.push('/');
  };

  render() {
    const { assertions, score, history, amount } = this.props;
    const { image } = this.state;
    return (
      <div className="feedback-main-container">
        {/* <Header /> */}
        <main>
          <img src={ logo } alt="" className="trivia-logo" />
          <div className="feedback-container">
            <img
              src={ image }
              alt="player"
              className={ `player-feedback ${assertions > 2
                ? 'good' : 'bad'}` }
            />
            <h1
              data-testid="feedback-text"
              style={ { color: `${assertions > 2
                ? '#2fc18c' : '#ea5d5d'}` } }
              className="result-text"
            >
              { assertions > parseInt((Number(amount) / 2), 10)
                ? 'WELL DONE!' : 'COULD BE BETTER...' }
            </h1>
            <div className="feeback-details">
              <h3
                className="feeback-details"
                data-testid="feedback-total-question"
              >
                { `You got ${assertions} ${assertions > 1
                  ? 'questions' : 'question'} right!`}
              </h3>
              <h3 data-testid="feedback-total-score">{ `Total of ${score} points` }</h3>
            </div>
          </div>
          <div className="button-container">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
              className="blue-btn"
            >
              RANKING
            </button>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => this.handleClick() }
              className="again-btn"
            >
              PLAY AGAIN
            </button>
          </div>
        </main>

        <footer className="footer" />
      </div>
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
  playAgain: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player, token }) => ({
  assertions: player.assertions,
  score: player.score,
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  amount: token.amount,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(newGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
