export function reloadPlayers(currentPlayer, playerArr){
    playerArr[currentPlayer.id] = currentPlayer;
}

export function getIds(currentPlayer, playerArr){
    if (playerArr[currentPlayer.id] === undefined){
        currentPlayer.id = Object.keys(playerArr).length;
    }
    playerArr[currentPlayer.id] = currentPlayer;
}
