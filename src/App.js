import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
        <Route path="/Game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}

export default App;
