import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Home from './screen/home/Home';
import Login from './screen/login/login';
import Inscription from './screen/inscription/Inscription';
import Game from './screen/game/Game';
import MainPage from './screen/home/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/inscription">
          <Inscription />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>        
      </Switch>
  </Router>
  );
}

export default App;
