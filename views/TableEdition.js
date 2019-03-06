import * as React from 'react';
import { Text, View, StyleSheet, Button, Modal, TextInput } from 'react-native';

import Directions from '../utils/Directions';
import Functions from '../utils/Functions';
import EditionActions from '../utils/EditionActions';
import shipm from '../models/ShipM';
import Table from '../components/Table';
import ShipEdit from '../components/ShipEdit';
import gameConstants from '../utils/GameConstants';
import DB from '../utils/DB';
import Map from '../models/Map';

let ShipM = shipm.ShipM;
let renderShip = shipm.renderShip;
let shipCollision = shipm.shipCollision;

let gP = Functions.gP;
let { UP, RIGHT } = Directions;

let defaultShips = ()=>{
    return [
        new ShipM('Submarine', gP(0,0), RIGHT),
        new ShipM('Submarine', gP(0,1), RIGHT),
        new ShipM('Submarine', gP(0,2), RIGHT),
        new ShipM('Submarine', gP(0,3), RIGHT, false, true),
        new ShipM('Destructor', gP(0,4), RIGHT, false, true),
        new ShipM('Destructor', gP(0,5), RIGHT),
        new ShipM('Destructor', gP(0,6), RIGHT),
        new ShipM('Cruiser', gP(0,7), RIGHT),
        new ShipM('Cruiser', gP(0,8), RIGHT),
        new ShipM('Battleship', gP(0,9), RIGHT)
    ];
}

export default class TableEdition extends React.Component {
    static defaultProps = {
        isDefault: true,
        toBattle: false,
        ships: defaultShips(),
        tableName: 'mapa_personalizado'
    }
    constructor(props){
        super(props);
        this.state = {
            ships: props.ships,
            shipSelected: -1,
            hasCollisions: false,
            showModal: false
        }
    }
    render(){
        let ships = this.state.ships.map((ship, i) => {
            return renderShip(i, ship, true, this.onShipSelect);
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
        const saveAsText = this.props.toBattle?'Guardar como y continuar':'Guardar como...';
        const saveText = this.props.toBattle?'Guardar y continuar':'Guardar';
        return (
            <View style={styles.container}>
                <ChangeName
                 showModal={this.state.showModal}
                 name={this.props.tableName}
                 saveName={this.saveName}
                 show={this.setChangeNameVisible} />
                <Text style={styles.textContainer} >{'Ordenar Mapa'}</Text>
                <View style={styles.centralContainer}>
                    <View style={styles.btnsContainer}>
                        <Button title={saveAsText} onPress={this.onPressSaveAs} />
                        <Button title={saveText} onPress={this.onPressSave} />
                        <Button title='Validar' onPress={this.validateMap}/>
                    </View>
                    <Table>
                        {ships}
                        {edits}
                    </Table>
                </View>
            </View>
        );
    }
    onShipSelect = (key)=>{
        let ships = [...this.state.ships];
        let shipSelected = key;
        if(this.state.shipSelected == -1){
            ships[key] = {...ships[key], selected: true};
        }else if(this.state.shipSelected == key){
            ships[key] = {...ships[key], selected: false};
            shipSelected = -1;
        }else{
            ships[this.state.shipSelected] = {...ships[this.state.shipSelected], selected: false};
            ships[key] = {...ships[key], selected: true};
        }
        this.setState({ ships, shipSelected });
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
    validateMap = () => {
        let hasCollisions = this.state.hasCollisions;
        let ships = [...this.state.ships];
        for (const i in ships) {
            if (ships.hasOwnProperty(i)) {
                ships[i].dead = false;
            }
        }
        let l = ships.length;
        let l1 = l - 1;
        for (let i = 0; i < l1; i++) {
            let ship1 = ships[i];
            for (let j = i + 1; j < l; j++) {
                let ship2 = ships[j];
                console.log('Verificando Colisión('+i+','+j+')');
                if(shipCollision(ship1,ship2)){
                    console.log('Colisión('+i+','+j+')');
                    ships[i].dead = true;
                    ships[j].dead = true;
                    if(!hasCollisions){
                        hasCollisions = true;
                    }
                    break;
                }
            }
        }
        this.setState({ ships, hasCollisions });
    }
    onPressSave = ()=>{
        if(this.props.isDefault){
            this.onPressSaveAs();
        }else{
            
        }
    }
    onPressSaveAs = ()=>{
        this.setChangeNameVisible(true)
    }
    saveName = name => {
        const map = new Map(name, [...this.state.ships]);
        let db = new DB();
        console.log('Guardando mapa');
        db.saveMap(map).then(map => {
            db.getMaps().then(maps => {
                console.log('Mapa en base de datos');
                console.log(map);
            })
        });
    }
    setChangeNameVisible = (showModal) => {
        this.setState({showModal});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    textContainer: {
        textAlign: 'center'
    },
    centralContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnsContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    ChangeName: {
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0
    },
    ChangeNameInput: {
        width: '80%',
        height: 30,
        borderColor: 'black',
        borderWidth: 1
    },
    ChangeNameBtn: {
        width: '20%',
        height: 30
    }
});

class ChangeName extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name
        }
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.showModal}
                onRequestClose={this.saveName}>
                <View style={styles.ChangeName}>
                    <TextInput
                        style={styles.ChangeNameInput}
                        value={this.state.name}
                        onChangeText={ name => this.setState({ name }) }
                     />
                    <Button title='Aceptar' onPress={this.show} />
                </View>
            </Modal>
        );
    }
    show = ()=>{
        this.props.show(false);
        this.saveName();
    }
    saveName = ()=>{
        this.props.saveName(this.state.name);
    }
}