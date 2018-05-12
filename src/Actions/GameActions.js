import {ACTION_TYPES} from './ActionTypes';
import * as firebase from "firebase";
import { getRandomName } from '../Utilities/NameGenerator';
import { getRandomLetters } from '../Utilities/LetterGenerator';
import moment from 'moment';
import { GAME_STATES } from '../Constants/GameStates';

export const hostGame = (history) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_TYPES.GAME_HOST_REQUESTED
        });

        //create a new game.
        var newGameRef = 
            firebase.database().ref().child('games').push({}, () => {
                newGameRef.set({"state": GAME_STATES.PREGAME})
                .then(() => {
                    var playerRef = newGameRef.child('players').push({}, () => {
                        const myName = getRandomName();
                        playerRef.set({host: true, name: myName});

                        newGameRef.once('value').then((game) => {
                            dispatch({
                                type: ACTION_TYPES.GAME_JOINED,
                                game: game.val(),
                                gameKey: newGameRef.key,
                                myPlayerId: playerRef.key
                            });

                            //slight delay before loading next page for animations to play
                            setTimeout(() => {
                                dispatch({ type: ACTION_TYPES.GAME_HOSTED });
                                history.push("/game/" + newGameRef.key);
                            }, 200);
                        });                     
                });
            });
        });
    }
}

export const joinGame = (gameId) => {
    return dispatch => {
        firebase.database().ref().child(`games/${gameId}`).once('value').then((gameSnap) => {
            var gameRef = gameSnap.ref;
            
            var playerRef = gameRef.child('players').push({}, () => {
                const myName = getRandomName();
                playerRef.set({host: false, name: myName});
            });

            gameRef.once('value').then((game) => {
                dispatch({
                    type: ACTION_TYPES.GAME_JOINED,
                    game: game.val(),
                    gameKey: gameRef.key,
                    myPlayerId: playerRef.key
                });
            });
        });
    }
}

export const updateGame = (game, gameKey) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.GAME_UPDATED,
            game,
            gameKey
        })
    }
}

export const startGame = (gameId) => {
    return dispatch => {
        const now = moment.utc().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
        firebase.database().ref().child(`games/${gameId}/endTime`).set(now);
        firebase.database().ref().child(`games/${gameId}/state`).set(GAME_STATES.STARTED);

        const randomLetters = getRandomLetters();
        firebase.database().ref().child(`games/${gameId}/letters`).set(randomLetters);

        dispatch({
            type: ACTION_TYPES.GAME_STARTED
        });
    }
}