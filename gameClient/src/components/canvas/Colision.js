import paintRect from './Painter';

export default function setScenario(
context,
gameSettings,
currentPlayer,
scenario)
{
    currentPlayer.canMove = true;
    //create object
    //colision conditions
    //draw object
    const blockSize = gameSettings.blockSize;
    for(let y = 0; y < 9; y++){
        for(let x = 0; x < 16; x++){
            let sprite = scenario[y][x];
            const xPaint = x * blockSize;
            const yPaint = y * blockSize;
            sprite.x = xPaint;
            sprite.y = yPaint;
            sprite.w = blockSize;
            sprite.h = blockSize;
            currentPlayer = colisionLogic(currentPlayer, sprite);
            
            paintRect(context, xPaint, yPaint, sprite.color, blockSize, blockSize);
        }
    }
    return currentPlayer;
}

function colisionLogic(currentPlayer, obj){
    if(obj.obstacle){
        if(currentPlayer.x + currentPlayer.w > obj.x && currentPlayer.x < obj.x + obj.w &&
        currentPlayer.y + currentPlayer.h > obj.y && currentPlayer.y < obj.y + obj.h){
            if (currentPlayer.x + currentPlayer.w >= obj.x && currentPlayer.x + currentPlayer.w <= obj.x + 3) {
                currentPlayer.canMove = false;
                currentPlayer.x-=1;
            }
            if (currentPlayer.x <= obj.x + obj.w && currentPlayer.x >= obj.x + obj.w - 3) {
                currentPlayer.canMove = false;
                currentPlayer.x+=1;
            }
            if (currentPlayer.y + currentPlayer.h >= obj.y && currentPlayer.y + currentPlayer.h <= obj.y + 3) {
                currentPlayer.canMove = false;
                currentPlayer.y-=1;
            }
            if (currentPlayer.y <= obj.y + obj.h && currentPlayer.y >= obj.y + obj.h - 3) {
                currentPlayer.canMove = false;
                currentPlayer.y+=1;
            }
        }        
    }
    return currentPlayer;
}
