import React, { Component } from 'react';
import './Styles/App.css';
import { Switch, Route} from 'react-router-dom';
import { HomePageContainer } from '../';
import { GamePageContainer } from '../';

export class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch id="app">
          <Route exact path='/' component={HomePageContainer} />
          <Route path='/game/:id' component={GamePageContainer} />
          {/*<Route path='/' component={PageNotFound} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;
