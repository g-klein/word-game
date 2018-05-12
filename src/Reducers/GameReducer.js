import {ACTION_TYPES} from '../Actions/ActionTypes';
export function gameReducer(state, action) {
    state = state || {greg: "greg"};
    switch(action.type) {
      case ACTION_TYPES.GAME_HOST_REQUESTED:
        return Object.assign({}, state, {hostLoading: true});
      case ACTION_TYPES.GAME_HOSTED:
        return Object.assign({}, state, {hostLoading: false});
      case ACTION_TYPES.GAME_JOINED:
      {
        let games = Object.assign({}, state.games);
        games[action.gameKey] = Object.assign({}, action.game, {myPlayerId: action.myPlayerId});
        return Object.assign({}, state, {games});
      }
      case ACTION_TYPES.GAME_UPDATED:
      {
        let games = Object.assign({}, state.games);
        games[action.gameKey] = Object.assign({}, games[action.gameKey], action.game);
        return Object.assign({}, state, {games});
      }
      default:
        return state || {};
    }
  }
  