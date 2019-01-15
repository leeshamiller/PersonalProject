import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Auth} />
            <Route path='/private' component={Dashboard} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
