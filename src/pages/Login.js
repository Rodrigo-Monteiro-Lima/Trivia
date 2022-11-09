import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/tokenAPI';
import { login } from '../redux/actions';

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
      <form action="">
        <label htmlFor="name">
          <input
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ name }
            id="name"
            name="name"
            placeholder="Nome"
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
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </form>
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
