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
                        playerRef.set({host: true, name: myName, score: 0});

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

export const joinGame = (gameKey) => {
    return dispatch => {
        firebase.database().ref().child(`games/${gameKey}`).once('value').then((gameSnap) => {
            var gameRef = gameSnap.ref;
            
            var playerRef = gameRef.child('players').push({}, () => {
                const myName = getRandomName();
                playerRef.set({host: false, name: myName, score: 0});
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

export const startGame = (gameKey) => {
    return dispatch => {
        const now = moment.utc().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
        firebase.database().ref().child(`games/${gameKey}/endTime`).set(now);
        firebase.database().ref().child(`games/${gameKey}/state`).set(GAME_STATES.STARTED);

        const randomLetters = getRandomLetters();
        firebase.database().ref().child(`games/${gameKey}/letters`).set(randomLetters);

        dispatch({
            type: ACTION_TYPES.GAME_STARTED
        });
    }
}

export const onWordInputChange = (gameKey, word, letters) => {
    return dispatch => {
        var valid = wordIsValid(word, letters);
        dispatch({
            type: ACTION_TYPES.GAME_INPUT_CHANGED,
            word,
            valid,
            gameKey
        });
    }
}

function wordIsValid(word, letters){
    if(!word.length)
    {
        return false;
    }

    for(var i = 0; i < word.length; i++){
        if(letters.some((l) => { return l === word[i] })){
            //letter is valid.  Remove it from list of letters.
            var idx = letters.indexOf(word[i]);
            letters.splice(idx, 1);
        } else {
            //Letter is invalid
            return false;
        }
    }

    return true;
}

export const submitWord = (gameKey, word, playerId) => {
    return dispatch => {
        dispatch({type: ACTION_TYPES.WORD_SUBMITTING, gameKey});

        firebase.database().ref().child(`games/${gameKey}/words`).once('value').then((wordSnap) => {
            const duplicate = wordAlreadySubmitted(word, wordSnap.val());
            if(!duplicate) {
                //add to list
                firebase.database().ref().child(`games/${gameKey}/words`).push(word);
                incrementPlayerScore(playerId, gameKey, dispatch);
            }   
            else {
                dispatch({type: ACTION_TYPES.WORD_SUBMITTED, gameKey});
            }
        });
    }
}

const wordAlreadySubmitted = (word, wordList) => {
    if(!wordList){
        return false;
    }

    var keys = Object.keys((wordList));
    for(var i = 0; i < keys.length; i++){
        if(wordList[keys[i]] === word){
            return true;
        }
    }
    
    return false;
}

const incrementPlayerScore = (playerId, gameKey, dispatch) => {
    firebase.database().ref().child(`games/${gameKey}/players/${playerId}`).once('value').then((playerSnap) => {
        var updatedPlayer = playerSnap.val();
        updatedPlayer.score++;
        firebase.database().ref().child(`games/${gameKey}/players/${playerId}`).update(updatedPlayer, () => {
            dispatch({ type: ACTION_TYPES.WORD_SUBMITTED, gameKey});
        });
    });
}