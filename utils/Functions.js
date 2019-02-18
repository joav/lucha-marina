import Point from './Point';
import gameConstants from './GameConstants';

function gP(x,y){
    return new Point(gameConstants.pieceSize * x, gameConstants.pieceSize * y);
}

let Functions = {
    gP: gP
}

export default Functions;
