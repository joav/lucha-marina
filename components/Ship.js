import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { PropTypes } from 'prop-types';

import Point from '../utils/Point';
import Directions from '../utils/Directions';
import PieceStyle from '../utils/PieceStyles';
import PieceTypes from '../utils/PieceTypes';
import gameConstants from '../utils/GameConstants'
import Piece from './Piece';

export default class Ship extends React.Component {
  static defaultProps = {
    dead: false,
    dir: Directions.UP
  }
  constructor(props){
    super(props);
    this.p1Dir = null;
    this.p2Dir = null;
  }
  renderSuper(){
    let styleDirection = this.props.dir == Directions.UP || this.props.dir == Directions.DOWN?styles.column:styles.row;
    return (
      <View style={{ ...styles.container, top: this.props.pos.y, left: this.props.pos.x ,...styleDirection}}>
        {this.renderPieces()}
      </View>
    );
  }
  renderPieces(){
    let piecesToRender = [];
    for(let i in this.state.pieces){
      piecesToRender.push(<Piece 
        hit={this.state.pieces[i].hit}
        dead={this.props.dead}
        baseStyle={this.state.pieces[i].style()}
        hitStyle={this.state.pieces[i].styleHit()}
        id={i}
        key={i}
        onPress={this.onPressPiece}
        showStyles={true} />);
    }
    return piecesToRender;
  }
  onPressPiece = (id) => {
    this.setState((state, props) => {
      let pieces = this.pieces();
      for(let i in pieces){
        pieces[i].setHit(state.pieces[i].hit);
      }
      pieces[id].setHit(true);
      return {pieces: pieces}
    });
  }
  getPiecesDir(props){
    this.p1Dir = Directions.UP;
    this.p2Dir = Directions.DOWN;
    switch(props.dir){
      case Directions.DOWN:
      case Directions.UP:
        this.p1Dir = Directions.UP;
        this.p2Dir = Directions.DOWN;
        break;
      case Directions.RIGHT:
      case Directions.LEFT:
        this.p1Dir = Directions.LEFT;
        this.p2Dir = Directions.RIGHT;
        break;
    }
  }
}

Ship.propTypes = {
  dead: PropTypes.bool,
  pos: PropTypes.instanceOf(Point),
  dir: PropTypes.oneOf([Directions.UP, Directions.RIGHT, Directions.DOWN, Directions.LEFT])
}
const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    width: '100%',
    height: gameConstants.pieceSize
  },
  column: {
    flexDirection: 'column',
    width: gameConstants.pieceSize
  },
  container: {
    position: 'absolute',
  }
});