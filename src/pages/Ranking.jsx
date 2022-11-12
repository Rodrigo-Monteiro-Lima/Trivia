import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Ranking extends React.Component {
  onClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
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
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
