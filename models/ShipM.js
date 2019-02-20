import * as React from 'react';


import Submarine from '../components/Submarine';
import Destructor from '../components/Destructor';
import Cruiser from '../components/Cruiser';
import Battleship from '../components/Battleship';

export default class ShipM {
    constructor(type, pos, dir, onPress = ()=>{}, enableDestroy = false){
        this.type = type;
        this.pos = pos;
        this.dir = dir;
        this.dead = false;
        this.enableDestroy = enableDestroy;
        this.selected = false;
        this.onPress = onPress;
    }
    renderShip(key){
        switch(this.type){
            case 'Submarine':
                return (<Submarine onPress={this.onPress} key={key} id={key} dead={this.dead} pos={this.pos} enableDestroy={this.enableDestroy} />);
            case 'Destructor':
                return (<Destructor onPress={this.onPress} key={key} id={key} dead={this.dead} pos={this.pos} dir={this.dir} enableDestroy={this.enableDestroy} />);
            case 'Cruiser':
                return (<Cruiser onPress={this.onPress} key={key} id={key} dead={this.dead} pos={this.pos} dir={this.dir} enableDestroy={this.enableDestroy} />);
            case 'Battleship':
                return (<Battleship onPress={this.onPress} key={key} id={key} dead={this.dead} pos={this.pos} dir={this.dir} enableDestroy={this.enableDestroy} />);
        }
    }
}