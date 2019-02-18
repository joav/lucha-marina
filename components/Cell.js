import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import gameConstants from '../utils/GameConstants';

export default class Cell extends React.Component {
  render(){
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.cell}>
          <Text style={styles.celInfo}>
            {`${this.props.row}${this.props.column}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  onPress = () => {
    this.props.onPress(this.props.id)
  }
}

const styles = StyleSheet.create({
  cell: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#81DAF5',
    width: gameConstants.pieceSize,
    height: gameConstants.pieceSize,
    position: 'relative'
  },
  celInfo: {
    fontSize: 8,
    color: '#a2a7a4'
  }
});