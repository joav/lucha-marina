import * as React from 'react';

import Point from '../utils/Point';
import gameConstants from '../utils/GameConstants';

import Directions from '../utils/Directions';

import Submarine from '../components/Submarine';
import Destructor from '../components/Destructor';
import Cruiser from '../components/Cruiser';
import Battleship from '../components/Battleship';

let { UP, RIGHT } = Directions;

class ShipM {
    constructor(type, pos, dir, enableDestroy = false, showValidate = false){
        this.type = type;
        switch (type) {
            case 'Submarine':
                this.length = 1;
                break;
            case 'Destructor':
                this.length = 2;
                break;
            case 'Cruiser':
                this.length = 3;
                break;
            case 'Battleship':
                this.length = 4;
                break;
        }
        this.pos = pos;
        this.dir = dir;
        this.dead = false;
        this.enableDestroy = enableDestroy;
        this.selected = false;
        this.limit = shipLimit(this);
        this.showValidate = showValidate;
    }
}
function renderShip(key, ship, editing, onPress = ()=>{}){
    switch(ship.type){
        case 'Submarine':
            return (<Submarine editing={editing} onPress={onPress} key={key} id={key} dead={ship.dead} pos={ship.pos} enableDestroy={ship.enableDestroy} />);
        case 'Destructor':
            return (<Destructor editing={editing} onPress={onPress} key={key} id={key} dead={ship.dead} pos={ship.pos} dir={ship.dir} enableDestroy={ship.enableDestroy} />);
        case 'Cruiser':
            return (<Cruiser editing={editing} onPress={onPress} key={key} id={key} dead={ship.dead} pos={ship.pos} dir={ship.dir} enableDestroy={ship.enableDestroy} />);
        case 'Battleship':
            return (<Battleship editing={editing} onPress={onPress} key={key} id={key} dead={ship.dead} pos={ship.pos} dir={ship.dir} enableDestroy={ship.enableDestroy} />);
    }
}

function shipLimit(ship) {
    let limit = new Point(ship.pos.x,ship.pos.y);
    switch (ship.dir) {
        case UP:
            limit.y += (gameConstants.pieceSize * ship.length);
            limit.x += gameConstants.pieceSize;
            break;
        case RIGHT:
            limit.y += gameConstants.pieceSize;
            limit.x += (gameConstants.pieceSize * ship.length);
            break;
    }
    return limit;
}

function piecesShip(ship){
    let pieces = [];
    let currPos = new Point(ship.pos.x,ship.pos.y);
    for (let i = 0; i < ship.length; i++) {
        if(ship.dir == UP){
            currPos.y += gameConstants.pieceSize;
        }else{
            currPos.x += gameConstants.pieceSize;
        }
        pieces.push(new Point(currPos.x, currPos.y));
    }
    return pieces;
}

function shipCollision(ship1,ship2) {
    let pieces1 = piecesShip(ship1);
    let pieces2 = piecesShip(ship2);
    for (let i = 0; i < ship1.length; i++) {
        const piece = pieces1[i];
        for (let j = 0; j < ship2.length; j++) {
            const piece2 = pieces2[j];
            if(piece.x - piece2.x == 0 && piece.y - piece2.y == 0){
                return true;
            }
        }
    }
    return false;
}

let shipm = {
    ShipM: ShipM,
    renderShip: renderShip,
    shipCollision: shipCollision
}

export default shipm;