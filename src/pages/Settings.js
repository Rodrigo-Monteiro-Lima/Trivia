import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
import { setSettings, newGame } from '../redux/actions';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      type: '',
      difficulty: '',
      category: '',
      amount: '',
    };
  }

  handleSettings = (e) => {
    e.preventDefault();
    const { type, category, difficulty, amount } = this.state;
    const { history, settings, playAgain } = this.props;
    const five = 5;
    const url = `${category}${difficulty}${type}`;
    playAgain();
    if (amount === '') {
      settings(url, five);
    } else {
      settings(url, amount);
    }
    history.push('/');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { difficulty, type, category, amount } = this.state;
    return (
      <div className="settings-container">
        <form
          onSubmit={ (e) => this.handleSettings(e) }
          className="settings-main-container"
        >
          <img src={ logo } alt="" className="logo-ranking" />
          <h1
            data-testid="settings-title"
          >
            SETTINGS
          </h1>
          <input
            className="number-questions"
            type="number"
            name="amount"
            id="amount"
            value={ amount }
            onChange={ this.handleChange }
            min="5"
            max="50"
            // required
            placeholder="Number of questions"
          />
          <select
            name="category"
            id="category"
            value={ category }
            placeholder="Category"
            aria-label="select category"
            onChange={ this.handleChange }
          >
            <option value="">Any Category</option>
            <option value="&category=9">General Knowledge</option>
            <option value="&category=10">Entertainment: Books</option>
            <option value="&category=11">Entertainment: Film</option>
            <option value="&category=12">Entertainment: Music</option>
            <option value="&category=13">Entertainment: Musicals & Theatres</option>
            <option value="&category=14">Entertainment: Television</option>
            <option value="&category=15">Entertainment: Video Games</option>
            <option value="&category=16">Entertainment: Board Games</option>
            <option value="&category=17">Science & Nature</option>
            <option value="&category=18">Science: Computers</option>
            <option value="&category=19">Science: Mathematics</option>
            <option value="&category=20">Mythology</option>
            <option value="&category=21">Sports</option>
            <option value="&category=22">Geography</option>
            <option value="&category=23">History</option>
            <option value="&category=24">Politics</option>
            <option value="&category=25">Art</option>
            <option value="&category=26">Celebrities</option>
            <option value="&category=27">Animals</option>
            <option value="&category=28">Vehicles</option>
            <option value="&category=29">Entertainment: Comics</option>
            <option value="&category=30">Science: Gadgets</option>
            <option value="&category=31">Entertainment: Japanese Anime & Manga</option>
            <option value="&category=32">Entertainment: Cartoon & Animations</option>
          </select>
          <select
            name="difficulty"
            id="difficulty"
            value={ difficulty }
            placeholder="Difficulty"
            aria-label="select difficulty"
            onChange={ this.handleChange }
          >
            <option value="">Any Difficulty</option>
            <option value="&difficulty=easy">Easy</option>
            <option value="&difficulty=medium">Medium</option>
            <option value="&difficulty=hard">Hard</option>
          </select>
          <select
            name="type"
            id="type"
            value={ type }
            placeholder="Type"
            aria-label="select type"
            onChange={ this.handleChange }
          >
            <option value="">Any Type</option>
            <option value="&type=boolean">True / False</option>
            <option value="&type=multiple">Multiple Choice</option>
          </select>
          {/* <select
            name="language"
            id="language"
            onChange={ this.handleChange }
            value={ language }
          >
            <option value="en-GB">{this.handleFetch('English')}</option>
            <option value="es-ES">Spanish</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japonese</option>
            <option value="pt-BR">Portuguese</option>
          </select> */}
          <button
            type="submit"
            className="green-btn button"
            // onClick={ (e) => e.preventDefault() }
          >
            PLAY
          </button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  settings: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  settings: (url, amount) => dispatch(setSettings(url, amount)),
  playAgain: () => dispatch(newGame()),
});

export default connect(null, mapDispatchToProps)(Settings);
