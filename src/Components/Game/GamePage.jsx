import React, { PureComponent } from 'react';
import './Styles/GamePage.css';
import { Col, Row } from 'react-bootstrap';
import { PlayerInfo } from './PlayerInfo';
import { GameHeader } from './GameHeader';
import { CountdownTimer } from './CountdownTimer';
import * as firebase from "firebase";
import { GAME_STATES } from '../../Constants/GameStates';
import { GameWordInput } from './GameWordInput';

export class GamePage extends PureComponent {
  constructor(){
    super();
    this.attachGameListener = this.attachGameListener.bind(this);
    this.getAvailableLetters = this.getAvailableLetters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {gameListenerAttached: false};
  }

  componentDidMount(){
    if(!this.props.game) {
      this.props.joinGame(this.props.gameId);
    }

    if(this.props.game){
      this.attachGameListener();
      this.setState({gameListenerAttached: true});
    }
  }

  handleChange(event) {
      this.props.onWordInputChange(this.props.gameId, event.target.value, this.props.gameLetters.slice());
  }

  handleSubmit(event) {
      event.preventDefault();
      this.props.submitWord(this.props.gameId, this.props.gameWord.value, this.props.myPlayerId);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.game && !this.state.gameListenerAttached){
      this.attachGameListener();
      this.setState({gameListenerAttached: true});
    }
  }

  getAvailableLetters(){
      return this.props.gameLetters && this.props.gameLetters.join(" ");
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
                <PlayerInfo 
                    players={this.props.players} 
                    myPlayerId={this.props.myPlayerId} 
                    isHost={this.props.isHost} 
                    startGame={this.props.startGame} 
                    gameId={this.props.gameId}
                    gameState={this.props.gameState} />
          </Col>
          {this.props.gameState !== GAME_STATES.PREGAME &&
          <Col md={8} sm={12}>
            <CountdownTimer gameEndTime={this.props.gameEndTime} />
            <div className="game-panel">
                <h3>Available letters:</h3>
                <p className="game-letters">{this.getAvailableLetters()}</p>
            </div>
            <div className="game-panel">
                <GameWordInput gameWord={this.props.gameWord} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </div>
          </Col>
          }
        </Row>
      </div>
    );
  }
}