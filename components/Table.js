import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import gameConstants from '../utils/GameConstants';
import Directions from '../utils/Directions';
import Functions from '../utils/Functions';

import Cell from './Cell';
import Submarine from './Submarine';
import Destructor from './Destructor';
import Cruiser from './Cruiser';
import Battleship from './Battleship';

let gP = Functions.gP;

export default class Table extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let cells = Array(100).fill(0).map((val, i) => {
      let column = (i % 10) + 1;
      let row = Math.floor(i / 10);
      return (
        <Cell id={i} key={i} row={rows[row]} column={column} onPress={this.onPressCell} />
      );
    });
    let rowNames = rows.map(row=>(
      <Text key={row} style={{...styles.name, ...styles.rowName}} >{row}</Text>
    ));
    let columnNames = Array(10).fill(0).map((val,i)=>(
      <Text key={(i+1)} style={{...styles.name, ...styles.columnName}} >{(i+1)}</Text>
    ));
    columnNames.unshift((
      <Text key={-1} style={{...styles.name, ...styles.columnName}}></Text>
    ));
    
    return (
      <View style={styles.container}>
        <View style={styles.columnNames} >
          {columnNames}
        </View>
        <View style={styles.cellsContainer} >
          <View style={styles.rowNames}>
            {rowNames}
          </View>
          <View style={styles.cells} >
            {cells}
            <Submarine dead={false} pos={gP(0,0)} />
            <Submarine dead={false} pos={gP(0,5)} />
            <Destructor dir={Directions.LEFT} dead={false} pos={gP(6,7)} />
            <Destructor dir={Directions.UP} dead={false} pos={gP(5,3)} />
            <Destructor dir={Directions.LEFT} dead={false} pos={gP(7,0)} />
            <Cruiser dir={Directions.LEFT} dead={false} pos={gP(5,9)} />
            <Cruiser dir={Directions.UP} dead={false} pos={gP(0,7)} />
            <Battleship dir={Directions.LEFT} dead={false} pos={gP(1,6)} />
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
  onPressCell = (id) => {
    this.props.onPressCell(id);
  }
}

const rows = Array(10).fill(0).map((val,i) => String.fromCharCode(65 + i) );

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: gameConstants.tableSize + 50,
    height: gameConstants.tableSize + 50
  },
  cellsContainer : {
    flexDirection: 'row',
    width: '100%',
    height: gameConstants.tableSize
  },
  cells: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ff0000',
    width: gameConstants.tableSize,
    height: gameConstants.tableSize,
    position: 'relative'
  },
  columnNames:{
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'flex-end'
  },
  rowNames: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 40
  },
  rowName:{
    height: gameConstants.pieceSize,
    position: 'relative',
    right: 10
  },
  columnName: {
    position: 'relative',
    width: gameConstants.pieceSize,
    left: 8,
    bottom: 5
  },
  name: {
    fontSize: 8,
    fontWeight: 'bold'
  }
});