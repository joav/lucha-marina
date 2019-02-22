import * as React from 'react';


import Submarine from '../components/Submarine';
import Destructor from '../components/Destructor';
import Cruiser from '../components/Cruiser';
import Battleship from '../components/Battleship';
class ShipM {
    constructor(type, pos, dir, enableDestroy = false){
        this.type = type;
        this.pos = pos;
        this.dir = dir;
        this.dead = false;
        this.enableDestroy = enableDestroy;
        this.selected = false;
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

let shipm = {
    ShipM: ShipM,
    renderShip: renderShip
}

export default shipm;