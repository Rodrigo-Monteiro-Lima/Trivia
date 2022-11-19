import React, { Component } from 'react';
import './Settings.css';
import logo from '../assets/logo.png';

class Settings extends Component {
  render() {
    return (
      <div className="settings-container">
        <div className="settings-main-container">
          <img src={ logo } alt="" className="logo-ranking" />
          <h1
            data-testid="settings-title"
          >
            SETTINGS
          </h1>
          <select name="" id="" placeholder="Category" aria-label="select category">
            <option value="" disabled selected>Category</option>
          </select>
          <select name="" id="" placeholder="Difficulty" aria-label="select difficulty">
            <option value="" disabled selected>Difficulty</option>
          </select>
          <select name="" id="" placeholder="Type" aria-label="select type">
            <option value="" disabled selected>Type</option>
          </select>
          <button
            type="button"
            className="green-btn button"

          >
            PLAY
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
