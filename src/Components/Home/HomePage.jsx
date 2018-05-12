import React, { PureComponent } from 'react';
import './Styles/HomePage.css';

export class HomePage extends PureComponent {
  constructor(){
    super();
    this.hostButtonClick = this.hostButtonClick.bind(this);
  }

  hostButtonClick(){
    this.props.hostGame(this.props.history);
  }

  render() {
    const loading = this.props.gameState && this.props.gameState.hostLoading;
    
    return (
      <div id="homepage" className={loading ? "loading" : ""}>
        <div className="homepage-centered">
          <div className="wrapper">
            <h1>Welcome to the word game!</h1>
          </div>
          <div className="wrapper">
            <button id="host-button" onClick={this.hostButtonClick}>Host</button>
          </div>
        </div>
      </div>
    );
  }
}