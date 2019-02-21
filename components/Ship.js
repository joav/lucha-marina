import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
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
    if(props.enableDestroy){
      this.getPiecesDir(props);
      this.state = {
        pieces: this.pieces()
      }
    }
    this.p1Dir = null;
    this.p2Dir = null;
  }
  renderSuper(){
    let styleDirection = this.props.dir == Directions.UP || this.props.dir == Directions.DOWN?styles.column:styles.row;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={{ ...styles.container, top: this.props.pos.y, left: this.props.pos.x ,...styleDirection}}>
          {this.renderPieces()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
  renderPieces(){
    this.getPiecesDir(this.props);
    let newPieces = this.pieces();
    let piecesToRender = [];
    // let onPress = this.props.enableDestroy?this.onPressPiece:()=>{};
    for(let i in newPieces){
      piecesToRender.push(<Piece 
        hit={newPieces[i].hit}
        dead={this.props.dead}
        baseStyle={newPieces[i].style()}
        hitStyle={newPieces[i].styleHit()}
        id={i}
        key={i}
        onPress={this.onPressPiece}
        showStyles={true} />);
    }
    return piecesToRender;
  }
  onPressPiece = (id) => {
    if(this.props.enableDestroy){
      this.setState((state, props) => {
        let pieces = this.pieces();
        for(let i in pieces){
          pieces[i].setHit(state.pieces[i].hit);
        }
        pieces[id].setHit(true);
        return {pieces: pieces}
      });
    }else{
      this.props.onPress(this.props.id);
    }
  }
  onPress = ()=>{
    this.props.onPress(this,props.id);
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
  pieces() {
    return [];
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