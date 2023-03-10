import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../services/tokenAPI';
import { login } from '../redux/actions';
import logo from '../logo trivia.png';
import './Login.css';
import image from '../background.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  };

  buttonValidation = () => {
    const { name, email } = this.state;
    if (email && name) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  playButton = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const gotToken = await getToken();

    localStorage.setItem('token', gotToken);
    dispatch(login(email, name));

    history.push('/Game');
  };

  render() {
    const { name, email, isBtnDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <img src={ image } alt="" className="bg-login" />
        <div className="image-container">
          <img src={ logo } alt="logo" />
        </div>
        <form action="">
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ name }
              id="name"
              name="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
              id="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isBtnDisabled }
            onClick={ this.playButton }
            className="start-btn"
          >
            PLAY
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
            className="start-btn config"
          >
            SETTINGS
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
