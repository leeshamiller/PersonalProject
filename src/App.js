import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Nav from './components/Dashboard/Nav/Nav';

import './reset.css';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Auth} />
            <Route path='/private' component={Nav} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
