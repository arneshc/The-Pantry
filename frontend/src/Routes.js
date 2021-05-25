import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import App from "./App";
import SingleSelect from "./Find";
import Signup from "./Signup";
import Account from "./Account";
import SearchResults from './searchResults';
import history from './history';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Find" component={SingleSelect} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Account" component={Account} />
          <Route path = "/searchResults" component={SearchResults}/>
        </Switch>
      </Router>
    )
  }
}
