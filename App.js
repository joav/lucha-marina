import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import PieceStyle from './utils/PieceStyles';
import Point from './utils/Point';
import Directions from './utils/Directions';
import Functions from './utils/Functions';
import Piece from './components/Piece';
import Submarine from './components/Submarine';
import Destructor from './components/Destructor';
import Cruiser from './components/Cruiser';
import Battleship from './components/Battleship';
import Table from './components/Table';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

let gP = Functions.gP;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Table onPressCell={this.onPressCell} >
            <Submarine dead={false} pos={gP(5,0)} />
            <Submarine dead={false} pos={gP(3,4)} />
        </Table>
      </View>
    );
  }
  onPressCell = (id)=>{
    let column = (id % 10) + 1;
    let row = Math.floor(id/10);
    console.log(`${rows[row]}${column}`)
  }
}

const rows = Array(10).fill(0).map((val,i) => String.fromCharCode(65 + i) );

/*
<Submarine dead={false} pos={new Point(0,0)} />
<Destructor dir={Directions.LEFT} dead={false} pos={new Point(0,0)} />
<Cruiser dir={Directions.UP} dead={false} pos={new Point(0,0)} />
<Battleship dir={Directions.LEFT} dead={false} pos={new Point(0,0)} />
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
