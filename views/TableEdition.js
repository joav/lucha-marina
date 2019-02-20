import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Directions from '../utils/Directions';
import Functions from '../utils/Functions';
import EditionActions from '../utils/EditionActions';
import ShipM from '../models/ShipM';
import Table from '../components/Table';
import ShipEdit from '../components/ShipEdit';
import Point from '../utils/Point';

let gP = Functions.gP;
let { UP, RIGHT } = Directions;

let defaultShips = (onPress)=>{
    return [
        new ShipM('Submarine', gP(0,0), RIGHT, onPress),
        new ShipM('Submarine', gP(0,1), RIGHT, onPress),
        new ShipM('Submarine', gP(0,2), RIGHT, onPress),
        new ShipM('Submarine', gP(0,3), RIGHT, onPress),
        new ShipM('Destructor', gP(0,4), RIGHT, onPress),
        new ShipM('Destructor', gP(0,5), UP, onPress),
        new ShipM('Destructor', gP(0,6), RIGHT, onPress),
        new ShipM('Cruiser', gP(0,7), RIGHT, onPress),
        new ShipM('Cruiser', gP(0,8), RIGHT, onPress),
        new ShipM('Battleship', gP(0,9), RIGHT, onPress)
    ];
}

export default class TableEdition extends React.Component {
    static defaultProps = {
        isDefault: true,
    }
    constructor(props){
        super(props);
        let ships = props.isDefault?defaultShips(this.onShipSelect):props.ships;
        this.state = {
            ships: ships
        }
    }
    render(){
        let ships = this.state.ships.map((ship, i) => {
            return ship.renderShip(i);
        });
        let edits = this.state.ships.map((ship, i) => {
            return <ShipEdit
            key={'e-'+i}
            shipId={i}
            show={ship.selected}
            dir={ship.dir}
            pos={ship.pos}
            type={ship.type}
            onPressTool={this.onPressTool} />
        });
        return (
            <View style={styles.container}>
                <Text>{'Ordenar Mapa'}</Text>
                <Table>
                    {ships}
                    {edits}
                </Table>
            </View>
        );
    }
    onShipSelect = (key)=>{
        let newShips = defaultShips(this.onShipSelect);
        this.setState((state, props) => {
            for(i in newShips){
                newShips[i].pos = new Point(state.ships[i].pos.x, state.ships[i].pos.y);
                newShips[i].dir = state.ships[i].dir;
                if(key == i && !state.ships[i].selected){
                    newShips[i].selected = true;
                }else{
                    newShips[i].selected = false;
                }
            }
            return { ships: newShips};
        });
    }
    onPressTool = (shipId, action) => {
        let { UP, DOWN, LEFT, RIGHT, TURN, CHECK } = EditionActions;
        switch(action){
            case UP:
                this.shipMove(shipId, gP(0,-1));
                break;
            case DOWN:
                this.shipMove(shipId, gP(0,1));
                break;
            case LEFT:
                this.shipMove(shipId, gP(-1,0));
                break;
            case RIGHT:
                this.shipMove(shipId, gP(1,0));
                break;
            case TURN:
                this.shipTurn(shipId);
                break;
            case CHECK:
                this.onShipSelect(shipId);
                break;
        }
    }
    shipMove(shipId, pos){
        let newShips = defaultShips(this.onShipSelect);
        this.setState((state, props) => {
            for(i in newShips){
                if(i == shipId){
                    pos.x += state.ships[i].pos.x;
                    pos.y += state.ships[i].pos.y;
                    newShips[i].pos = pos;
                }else{
                    newShips[i].pos = new Point(state.ships[i].pos.x, state.ships[i].pos.y);
                }
                newShips[i].dir = state.ships[i].dir;
                newShips[i].selected = state.ships[i].selected;
            }
            return { ships: newShips};
        });
    }
    shipTurn(shipId){
        let newShips = defaultShips(this.onShipSelect);
        this.setState((state, props) => {
            for(i in newShips){
                newShips[i].pos = new Point(state.ships[i].pos.x, state.ships[i].pos.y);
                if(i == shipId){
                    newShips[i].dir = state.ships[i].dir == UP?RIGHT:UP;
                }else{
                    newShips[i].dir = state.ships[i].dir;
                }
                newShips[i].selected = state.ships[i].selected;
            }
            return { ships: newShips};
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    }
});