import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
import configIcon from '../assets/config.svg';
// import starIcon from '../assets/star.svg';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score, history } = this.props;

    const userEmail = gravatarEmail;
    const emailHash = md5(userEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${emailHash}`;

    return (
      <header>
        <div className="header-container">
          <div className="player">
            <img
              src={ gravatarImg }
              alt="user avatar"
              data-testid="header-profile-picture"
              className="avatar"
            />
            <p data-testid="header-player-name">
              { name }
            </p>
          </div>

          <p data-testid="header-score" className="score">
            {`Pontos: ${score}`}
          </p>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
            className="btn-config"
          >
            <img src={ configIcon } alt="config icon" />
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
