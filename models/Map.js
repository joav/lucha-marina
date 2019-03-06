import uuid from 'uuid/v1';

export default class Map {
    constructor(name, ships){
        this.id = uuid();
        this.name = name;
        this.ships = ships;
    }
}