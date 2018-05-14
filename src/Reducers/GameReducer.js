import {ACTION_TYPES} from '../Actions/ActionTypes';
export function gameReducer(state, action) {
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
      case ACTION_TYPES.GAME_INPUT_CHANGED: 
      {
        let games = Object.assign({}, state.games);
        let word = {
            value: action.word,
            valid: action.valid
        }

        games[action.gameKey] = Object.assign({}, games[action.gameKey], {word});
        
        return Object.assign({}, state, {games});
      }
      case ACTION_TYPES.WORD_SUBMITTING: {
        let games = Object.assign({}, state.games);
        let word = Object.assign({}, games[action.gameKey].word, {submitting: true});
        games[action.gameKey] = Object.assign({}, games[action.gameKey], {word});

        return Object.assign({}, state, {games});
      }
      case ACTION_TYPES.WORD_SUBMITTED: {
        let games = Object.assign({}, state.games);
        let word = Object.assign({}, games[action.gameKey].word, { value: "", valid: false, submitting: false });
        games[action.gameKey] = Object.assign({}, games[action.gameKey], {word});

        return Object.assign({}, state, {games});
      }
      case ACTION_TYPES.GAME_STARTED:
      {
        let games = Object.assign({}, state.games);
        games[action.gameKey] = Object.assign({}, games[action.gameKey], {endTriggered: false});
        return Object.assign({}, state, {games});
      }
      case ACTION_TYPES.GAME_ENDING:
      case ACTION_TYPES.GAME_ENDED:
      {
        let games = Object.assign({}, state.games);
        games[action.gameKey] = Object.assign({}, games[action.gameKey], {endTriggered: true});
        return Object.assign({}, state, {games});
      }
      default:
        return state || {};
    }
  }
  