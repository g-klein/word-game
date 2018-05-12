import {ACTION_TYPES} from './ActionTypes';
import * as firebase from "firebase";
import {browserHistory } from 'react-router-dom';
import { getRandomName } from '../Utilities/NameGenerator';

export const hostGame = (history) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_TYPES.GAME_HOST_REQUESTED
        });

        //create a new game.
        var newGameRef = 
            firebase.database().ref().child('games').push({}, () => {
                newGameRef.set({"Started": false})
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
                        });
                        
                        //slight delay before loading next page for animations to play
                        var interval = setTimeout(() => {
                            dispatch({type: ACTION_TYPES.GAME_HOSTED});
                            history.push("/game/" + newGameRef.key);
                        }, 200);                        
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