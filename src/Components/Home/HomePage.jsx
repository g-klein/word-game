import React, { Component } from 'react';
import './Styles/HomePage.css';

export class HomePage extends Component {
  constructor(){
    super();
    this.hostButtonClick = this.hostButtonClick.bind(this);
    this.state = {hidden: false};
  }

  hostButtonClick() {
    this.setState({hidden: true});
  }


  render() {
    return (
      <div id="homepage" className={(this.state.hidden ? "loading" : "")}>
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