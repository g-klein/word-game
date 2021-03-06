import { GamePage } from './';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { withRouter } from 'react-router-dom';
import { getGame, getPlayers, getMyPlayerId, isHost, getGameId, getGameEndTime, getGameState, getGameLetters, getWord, getEndTriggered, getWinner } from '../../Selectors';

export const GamePageContainer = withRouter(connect((state, props) => {
    return {
        game: getGame(state, props),
        gameId: getGameId(state, props),
        players: getPlayers(state, props),
        myPlayerId: getMyPlayerId(state, props),
        isHost: isHost(state, props),
        gameEndTime: getGameEndTime(state, props),
        gameState: getGameState(state, props),
        gameLetters: getGameLetters(state, props),
        gameWord: getWord(state, props),
        endTriggered: getEndTriggered(state, props),
        winner: getWinner(state, props)
    }    
}, actions)(GamePage));