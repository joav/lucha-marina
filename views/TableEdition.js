import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Directions from '../utils/Directions';
import Functions from '../utils/Functions';
import EditionActions from '../utils/EditionActions';
import shipm from '../models/ShipM';
import Table from '../components/Table';
import ShipEdit from '../components/ShipEdit';
import Point from '../utils/Point';

let ShipM = shipm.ShipM;
let renderShip = shipm.renderShip;

let gP = Functions.gP;
let { UP, RIGHT } = Directions;

let defaultShips = ()=>{
    return [
        new ShipM('Submarine', gP(0,0), RIGHT),
        new ShipM('Submarine', gP(0,1), RIGHT),
        new ShipM('Submarine', gP(0,2), RIGHT),
        new ShipM('Submarine', gP(0,3), RIGHT),
        new ShipM('Destructor', gP(0,4), RIGHT),
        new ShipM('Destructor', gP(0,5), UP),
        new ShipM('Destructor', gP(0,6), RIGHT),
        new ShipM('Cruiser', gP(0,7), RIGHT),
        new ShipM('Cruiser', gP(0,8), RIGHT),
        new ShipM('Battleship', gP(0,9), RIGHT)
    ];
}

export default class TableEdition extends React.Component {
    static defaultProps = {
        isDefault: true,
    }
    constructor(props){
        super(props);
        let ships = props.isDefault?defaultShips():props.ships;
        this.state = {
            ships: ships
        }
    }
    render(){
        let ships = this.state.ships.map((ship, i) => {
            return renderShip(i, ship, this.onShipSelect);
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
        let ships = [...this.state.ships];
        let shipSelected = ships.findIndex(ship => ship.selected);
        if(key != shipSelected ){
            ships = this.state.ships.map(ship => ({...ship, selected: false}));
            ships[key] = {...ships[key], selected: true};
        }else{
            ships[key] = {...ships[key], selected: false};
        }
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
        let ships = [...this.state.ships];
        pos.x += ships[shipId].pos.x;
        pos.y += ships[shipId].pos.y;
        ships[shipId] = {...ships[shipId], pos: pos};
        this.setState({ ships });
    }
    shipTurn(shipId){
        let ships = [...this.state.ships];
        ships[shipId] = {...ships[shipId], dir: (ships[shipId].dir == UP?RIGHT:UP)};
        this.setState({ ships });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    }
});