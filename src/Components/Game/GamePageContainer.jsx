import { GamePage } from './';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { withRouter } from 'react-router-dom';
import { getGame, getPlayers, getMyPlayerId, isHost, getGameId } from '../../Selectors';

export const GamePageContainer = withRouter(connect((state, props) => {
    return {
        gameState: state.gameReducer,
        game: getGame(state, props),
        gameId: getGameId(state, props),
        players: getPlayers(state, props),
        myPlayerId: getMyPlayerId(state, props),
        isHost: isHost(state, props)
    }    
}, actions)(GamePage));