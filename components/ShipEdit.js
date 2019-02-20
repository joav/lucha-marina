import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons'

import gameConstants from '../utils/GameConstants';
import EditionActions from '../utils/EditionActions';

export default class ShipEdit extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const iconSize = gameConstants.pieceSize;
        let type = this.props.type;
        let dir = this.props.dir;
        let stylesTool = this.props.show?styles.tool:styles.none;
        return (
            <View style={{ ...styles.container, top: this.props.pos.y, left: this.props.pos.x}}>
                <View style={styles.toolsContainer}>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.UP)}} style={{...stylesTool, ...styles[type+'Up'+dir] }}>
                        <View>
                            <AntDesign name="arrowup" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.DOWN)}} style={{...stylesTool, ...styles[type+'Down'+dir] }}>
                        <View>
                            <AntDesign name="arrowdown" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.LEFT)}} style={{...stylesTool, ...styles[type+'Left'+dir] }}>
                        <View>
                            <AntDesign name="arrowleft" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.RIGHT)}} style={{...stylesTool, ...styles[type+'Right'+dir] }}>
                        <View>
                            <AntDesign name="arrowright" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.TURN)}} style={{...stylesTool, ...styles[type+'Turn'+dir] }}>
                        <View>
                            <AntDesign name="reload1" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.onPressTool(this.props.shipId, EditionActions.CHECK)}} style={{...stylesTool, ...styles[type+'Check'+dir] }}>
                        <View>
                            <AntDesign name="check" size={iconSize} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const {pieceSize} = gameConstants;
pieceSize2 = pieceSize / 2;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    toolsContainer: {
        position: 'relative',
    },
    tool: {
        position: 'absolute',
    },
    none: {
        display: 'none'
    },
    SubmarineUp0: {
        top: -pieceSize
    },
    SubmarineUp1: {
        top: -pieceSize
    },
    SubmarineDown0: {
        top: pieceSize
    },
    SubmarineDown1: {
        top: pieceSize
    },
    SubmarineLeft0: {
        left: -pieceSize
    },
    SubmarineLeft1: {
        left: -pieceSize
    },
    SubmarineRight0: {
        left: pieceSize
    },
    SubmarineRight1: {
        left: pieceSize
    },
    SubmarineCheck0: {
        left: pieceSize,
        top: pieceSize
    },
    SubmarineCheck1: {
        left: pieceSize,
        top: pieceSize
    },
    SubmarineTurn0: {
        left: 0
    },
    SubmarineTurn1: {
        left: 0
    },
    DestructorUp0: {
        top: -pieceSize
    },
    DestructorUp1: {
        top: -pieceSize,
        left: pieceSize2
    },
    DestructorDown0: {
        top: pieceSize * 2
    },
    DestructorDown1: {
        top: pieceSize,
        left: pieceSize2
    },
    DestructorLeft0: {
        left: -pieceSize,
        top: pieceSize2
    },
    DestructorLeft1: {
        left: -pieceSize
    },
    DestructorRight0: {
        left: pieceSize,
        top: pieceSize2
    },
    DestructorRight1: {
        left: pieceSize * 2
    },
    DestructorCheck0: {
        left: pieceSize,
        top: pieceSize2 + pieceSize 
    },
    DestructorCheck1: {
        left: pieceSize * 2,
        top: pieceSize
    },
    DestructorTurn0: {
        top: pieceSize2
    },
    DestructorTurn1: {
        left: pieceSize2
    },
    CruiserUp0: {
        top: -pieceSize
    },
    CruiserUp1: {
        top: -pieceSize,
        left: pieceSize
    },
    CruiserDown0: {
        top: pieceSize * 3
    },
    CruiserDown1: {
        top: pieceSize,
        left: pieceSize
    },
    CruiserLeft0: {
        left: -pieceSize,
        top: pieceSize
    },
    CruiserLeft1: {
        left: -pieceSize
    },
    CruiserRight0: {
        left: pieceSize,
        top: pieceSize
    },
    CruiserRight1: {
        left: pieceSize * 3
    },
    CruiserCheck0: {
        left: pieceSize,
        top: pieceSize + pieceSize
    },
    CruiserCheck1: {
        left: pieceSize * 3,
        top: pieceSize
    },
    CruiserTurn0: {
        top: pieceSize
    },
    CruiserTurn1: {
        left: pieceSize
    },
    BattleshipUp0: {
        top: -pieceSize
    },
    BattleshipUp1: {
        top: -pieceSize,
        left: pieceSize + pieceSize2
    },
    BattleshipDown0: {
        top: pieceSize * 4
    },
    BattleshipDown1: {
        top: pieceSize,
        left: pieceSize + pieceSize2
    },
    BattleshipLeft0: {
        left: -pieceSize,
        top: pieceSize + pieceSize2
    },
    BattleshipLeft1: {
        left: -pieceSize
    },
    BattleshipRight0: {
        left: pieceSize,
        top: pieceSize + pieceSize2
    },
    BattleshipRight1: {
        left: pieceSize * 4
    },
    BattleshipCheck0: {
        left: pieceSize,
        top: pieceSize * 2 + pieceSize2
    },
    BattleshipCheck1: {
        left: pieceSize * 4,
        top: pieceSize
    },
    BattleshipTurn0: {
        top: pieceSize + pieceSize2
    },
    BattleshipTurn1: {
        left: pieceSize + pieceSize2
    },
});