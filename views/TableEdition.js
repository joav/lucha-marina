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
        let ships = this.state.ships.map(ship => {
            let newShip = {...ship, selected: false, renderShip: ship.renderShip};
            newShip.renderShip.bind(newShip);
        });
        let shipSelected = this.state.ships.findIndex(ship => ship.selected);
        let renderShip = ships[key].renderShip;
        if(key != shipSelected ){
            ships[key] = {...ships[key], selected: true, renderShip: renderShip};
        }else{
            ships[key] = {...ships[key], selected: false, renderShip: renderShip};
        }
        ships[key].renderShip.bind(ships[key]);
        this.setState({ ships });
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
        let ships = this.state.ships.map(ship => ({...ship}));
        pos.x += ships[shipId].x;
        pos.y += ships[shipId].y;
        ships[shipId] = {...ships[shipId], pos: pos};
        ships[shipId].renderShip.bind(ships[shipId]);
        this.setState({ ships });
    }
    shipTurn(shipId){
        let ships = this.state.ships.map(ship => ({...ship}));
        ships[shipId] = {...ships[shipId], dir: (ships[shipId].dir == UP?RIGHT:UP)};
        ships[shipId].renderShip.bind(ships[shipId]);
        this.setState({ ships });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    }
});