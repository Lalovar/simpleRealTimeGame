function reloadPlayers(currentPlayer, playerArr){
    playerArr[currentPlayer.id] = currentPlayer;
}

function getIds(currentPlayer, playerArr){
    if (playerArr[currentPlayer.id] === undefined){
        currentPlayer.id = Object.keys(playerArr).length;
    }
    playerArr[currentPlayer.id] = currentPlayer;
}


let players = { '0':
   { x: 1,
     y: 120,
     color: 'red',
     h: 32,
     w: 32,
     image: {},
     canMove: true,
     id: 0 },
  '1':
   { x: 1,
     y: 120,
     color: 'red',
     h: 32,
     w: 32,
     image: {},
     canMove: true,
     id: 1 } }

const p1 = { 
    x: 100,
    y: 100,
    id: 0
} 
     
const p2 = { 
    x: 999,
    y: 999,
    id: 1
} 

for (const prop in players) {
        if(players[prop].id !== p1.id)
        console.log(players[prop]);
    }