import * as React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

export default class Piece extends React.Component {
  static defaultProps = {
    showStyles: false
  }
  constructor(props){
    super(props)
  }
  render(){
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={ this.props.hit? this.props.hitStyle : this.props.baseStyle } >
          <Text>{this.props.dead?'X':''}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  onPress = ()=>{
    this.props.onPress(this.props.id);
  }
}

Piece.propTypes = {
  hit: PropTypes.bool,
  dead: PropTypes.bool,
  baseStyle: PropTypes.any,
  onPress: PropTypes.any
}
