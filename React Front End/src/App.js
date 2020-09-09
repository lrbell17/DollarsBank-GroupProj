import React from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Transaction from './components/Transaction.js';
import HomePage from './components/HomePage.js';
import Account from './components/Account.js';
import Update from './components/Update.js'
import UserTransactions from './components/UserTransactions.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={HomePage} />
            <Route path="/transaction" exact component={Transaction} />
            <Route path="/transactions/all" exact component={UserTransactions} />
            <Route path="/account" component={Account}/>
            <Route path="/update" component={Update}/>
          </Switch>

      </div>
    </Router>
  );
}

export default App;
