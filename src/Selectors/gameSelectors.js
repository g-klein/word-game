export function getGameId(state, props) {
    return props && props.match && props.match.params && props.match.params.id;
}

export function getGame(state, props) {
    const gameId = getGameId(state, props);
    return state && state.gameReducer && state.gameReducer.games && state.gameReducer.games[gameId];
}

export function getPlayers(state, props) {
    const game = getGame(state, props);
    return game && game.players;
}

export function getMyPlayerId(state, props) {
    const game = getGame(state, props);
    return game && game.myPlayerId;
}

export function getHostId(state, props) {
    const players = getPlayers(state, props);
    const playerKeys = players && Object.keys(players);
    const host = playerKeys && playerKeys.map((key) => {
        if(players[key].host){
            return key;
        }
    });

    return host && host[0];
}

export function isHost(state, props) {
    const myPlayerId = getMyPlayerId(state, props);
    const hostId = getHostId(state, props);

    return myPlayerId === hostId;
}