import React, { PureComponent } from 'react';
import './Styles/GamePage.css';
import { Col, Row } from 'react-bootstrap';
import { PlayerInfo } from './PlayerInfo';
import { GameHeader } from './GameHeader';
import { CountdownTimer } from './CountdownTimer';
import * as firebase from "firebase";
import { GAME_STATES } from '../../Constants/GameStates';
import { GameWordInput } from './GameWordInput';
import { SubmittedWords } from './SubmittedWords';
import { AvailableLetters } from './AvailableLetters';
import { GameOverBox } from './GameOverBox';

export class GamePage extends PureComponent {
  constructor(){
    super();
    this.attachGameListener = this.attachGameListener.bind(this);
    this.getAvailableLetters = this.getAvailableLetters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stopGame = this.stopGame.bind(this);
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

  stopGame(){
    if(this.props.isHost && !this.props.endTriggered && this.props.gameState === GAME_STATES.STARTED){
      console.log("Stopping the game!");
      this.props.stopGame(this.props.gameId);
    }
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
      <div>
        <div id="gamepage" className={this.props.gameState === GAME_STATES.ENDED ? "game-over" : ""}>
          <Row>
            <Col xs={12}>
              <GameHeader />
            </Col>          
            <Col md={5} sm={12}>
                  <PlayerInfo 
                      players={this.props.players} 
                      myPlayerId={this.props.myPlayerId} 
                      isHost={this.props.isHost} 
                      startGame={this.props.startGame} 
                      gameId={this.props.gameId}
                      gameState={this.props.gameState} />
            </Col>
            {this.props.gameState !== GAME_STATES.PREGAME &&
            <Col md={7} sm={12}>
              <CountdownTimer gameEndTime={this.props.gameEndTime} stopGame={this.stopGame} />
              <SubmittedWords gameWords={this.props.game && this.props.game.words} />
              <AvailableLetters getAvailableLetters={this.getAvailableLetters} />
              <GameWordInput gameWord={this.props.gameWord} gameState={this.props.gameState} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </Col>
            }
          </Row>
        </div>
        {this.props.gameState === GAME_STATES.ENDED &&
          <GameOverBox winner={this.props.winner} myPlayerId={this.props.myPlayerId} />
        }
      </div>
    );
  }
}