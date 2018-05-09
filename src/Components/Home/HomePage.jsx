import React, { PureComponent } from 'react';
import './Styles/HomePage.css';
import * as firebase from "firebase";

export class HomePage extends PureComponent {
  constructor(){
    super();
    this.hostButtonClick = this.hostButtonClick.bind(this);
    this.state = {loading: false};
  }

  hostButtonClick(){
    //TODO: move all this code to props / actions
    this.setState({loading: true});

    var newGameRef = firebase.database().ref().child('games').push();
    newGameRef.set({"Dirty dan": "daneroo"}).then(() => {
      console.log("Success!");
      this.setState({loading: false});
    });

    console.log(newGameRef);
  }

  render() {
    return (
      <div id="homepage" className={this.state.loading ? "loading" : ""}>
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