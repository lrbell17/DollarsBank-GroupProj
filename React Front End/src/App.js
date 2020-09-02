import React from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

      </div>
    </Router>
  );
}

export default App;
