import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions';
import './Ranking.css';
import logo from '../assets/logo.png';

class Ranking extends React.Component {
  state = { ranking: [] };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: orderedRanking,
    });
  }

  onClick = () => {
    const { history, playAgain } = this.props;
    playAgain();
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div className="ranking-main-container">
        <div className="ranking-container">
          <img src={ logo } alt="" className="logo-ranking" />
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="players-ranking-container">
            {ranking.map((player, i) => (
              <div key={ i } className="player-ranking">
                {console.log(typeof player.score)}
                <div data-testid={ `player-name-${i}` } className="player-info">
                  <img src={ player.gravatarImg } alt={ player.name } />
                  {player.name}
                </div>
                <div data-testid={ `player-score-${i}` } className="player-score">
                  <p>
                    <b>{player.score}</b>
                    &nbsp;points
                  </p>
                  {/* <p>{`${player.score.toString().bold()} points`}</p> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={ this.onClick }
            data-testid="btn-go-home"
            className="green-btn btn"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playAgain: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(newGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);
