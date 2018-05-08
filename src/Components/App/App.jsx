import React, { Component } from 'react';
import './Styles/App.css';
import { Switch, Route} from 'react-router-dom';
import { HomePage } from '../';

export class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch id="app">
          <Route exact path='/' component={HomePage} />
          {/*<Route path='/game/:id' component={GamePage} />
          <Route path='/' component={PageNotFound} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;
