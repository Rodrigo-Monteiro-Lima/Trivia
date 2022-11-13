import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { connect } from 'react-redux';

class Ranking extends React.Component {
  state = { ranking: [] };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    console.log(ranking);
    console.log(orderedRanking);

    this.setState({
      ranking: orderedRanking,
    });
  }

  onClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <>
        <Header />
        <button
          type="button"
          onClick={ this.onClick }
          data-testid="btn-go-home"
        >
          Home
        </button>
        <h1>Ranking</h1>
        <div>
          {ranking.map((player, i) => (
            <div key={ i }>
              <img src={ player.gravatarImg } alt={ player.name } />
              <div data-testid={ `player-name-${i}` }>
                {player.name}
              </div>
              <div data-testid={ `player-score-${i}` }>
                {player.score}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // name: PropTypes.string.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
};

// const mapStateToProps = ({ player }) => ({
//   name: player.name,
//   gravatarEmail: player.gravatarEmail,
//   score: player.score,
// });

// export default connect(mapStateToProps)(Ranking);
export default Ranking;
