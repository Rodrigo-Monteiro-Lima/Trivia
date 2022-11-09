import React, { Component } from 'react';

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

  render() {
    const { name, email, isBtnDisabled } = this.state;
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
          onClick={ () => this.handleClick(email, name) }
        >
          Play
        </button>
      </form>

    );
  }
}

export default Login;
