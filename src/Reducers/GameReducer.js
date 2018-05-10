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
        games[action.game.key] = action.game;
        return Object.assign({}, state, {games});
      }
      default:
        return state || {};
    }
  }
  