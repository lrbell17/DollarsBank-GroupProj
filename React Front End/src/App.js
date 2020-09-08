import React from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';

import Transaction from './components/Transaction.js';
import HomePage from './components/HomePage.js'
import Account from './components/Account.js'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={HomePage} />
            <Route path="/transaction" component={Transaction} />
            <Route path="/account" component={Account}/>

          </Switch>

      </div>
    </Router>
  );
}

export default App;
