import {ACTION_TYPES} from './ActionTypes';
import * as firebase from "firebase";

export const HostGame = () => {
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
                        playerRef.set({host: true});
                        dispatch({
                            type: ACTION_TYPES.GAME_JOINED,
                            game: newGameRef,
                            me: playerRef.key
                        });

                        //slight delay before loading next page for animations to play
                        var interval = setTimeout(() => {
                            dispatch({type: ACTION_TYPES.GAME_HOSTED});
                        }, 1000);                        
                });
            });
        });
    }
}