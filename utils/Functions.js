import Point from './Point';
import gameConstants from './GameConstants';

function gP(x,y){
    return new Point(gameConstants.pieceSize * x, gameConstants.pieceSize * y);
}

function getCellIDByPos(pos) {
    let column = parseInt( 1 + pos.x / gameConstants.pieceSize );
    let row = parseInt( 65 + pos.y / gameConstants.pieceSize );
    let rowName = String.fromCharCode(row);
    return rowName + column;
}

let Functions = {
    gP: gP,
    getCellIDByPos: getCellIDByPos
}

export default Functions;
