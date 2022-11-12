import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/Game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/Feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}

export default App;
