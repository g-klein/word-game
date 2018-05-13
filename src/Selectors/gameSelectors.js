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
    const hostId = playerKeys && playerKeys.find((key) => {
        return players[key].host;
    });

    return hostId;
}

export function isHost(state, props) {
    const myPlayerId = getMyPlayerId(state, props);
    const hostId = getHostId(state, props);

    return myPlayerId === hostId;
}

export function getGameEndTime(state, props){
    const game = getGame(state, props);
    return game && game.endTime;
}

export function getGameState(state, props) {
    const game = getGame(state, props);
    return game && game.state;
}

export function getGameLetters(state, props) {
    const game = getGame(state, props);
    return game && game.letters;
}

export function getWord(state, props) {
    const game = getGame(state, props);
    return (game && game.word) || "";
}