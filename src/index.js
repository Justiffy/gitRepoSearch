import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/search/:repo" component={App}/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);
