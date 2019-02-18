import * as React from 'react';
import { PropTypes } from 'prop-types';

import PieceTypes from '../utils/PieceTypes';
import Directions from '../utils/Directions';
import PieceM from '../models/PieceM';
import Ship from './Ship';

export default class Destructor extends Ship {
  name = 'Destructor';
  constructor(props){
    super(props);
    this.getPiecesDir(props);
    this.state = {
      pieces: this.pieces()
    };
  }
  render(){
    return this.renderSuper();
  }
  pieces(){
    return [
      new PieceM(this.props.pos, PieceTypes.TRIANGLE, this.p1Dir),
      new PieceM(this.props.pos, PieceTypes.TRIANGLE, this.p2Dir),
    ];
  }
}
