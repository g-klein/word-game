import React, { PureComponent } from 'react';
import './Styles/GamePage.css';
import { Col, Row } from 'react-bootstrap';
import { PlayerInfo } from './PlayerInfo.jsx';
import { GameHeader } from './GameHeader';
import * as firebase from "firebase";

export class GamePage extends PureComponent {
  constructor(){
    super();
    this.attachGameListener = this.attachGameListener.bind(this);
    this.state = {gameListenerAttached: false};
  }

  componentDidMount(){
    if(!this.props.game) {
      this.props.joinGame(this.props.gameId);
    }

    if(this.props.game){
      this.attachGameListener();
      this.state = {gameListenerAttached: true};
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.game && !this.state.gameListenerAttached){
      this.attachGameListener();
      this.setState({gameListenerAttached: true});
    }
  }

  attachGameListener(){
    firebase.database().ref().child(`games/${this.props.gameId}`).on('value', (gameSnap) => {
        this.props.updateGame(gameSnap.val(), gameSnap.key);
    });
  }

  render() {    
    return (
      <div id="gamepage">
        <Row>
          <Col xs={12}>
            <GameHeader />
          </Col>
          <Col md={4} sm={12}>
            <PlayerInfo players={this.props.players} myPlayerId={this.props.myPlayerId} isHost={this.props.isHost} />
          </Col>
          <Col md={8} sm={12}>
            <div className="game-panel"></div>
          </Col>
        </Row>
      </div>
    );
  }
}