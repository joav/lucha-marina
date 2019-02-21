import * as React from 'react';
import { PropTypes } from 'prop-types';

import PieceTypes from '../utils/PieceTypes';
import Directions from '../utils/Directions';
import PieceModel from '../models/PieceModel';
import Ship from './Ship';

const PieceM = PieceModel.PieceM;

export default class Battleship extends Ship {
  name = 'Battleship';
  
  constructor(props){
    super(props);
  }
  render(){
    return this.renderSuper();
  }
  pieces(){
    return [
      new PieceM(this.props.pos, PieceTypes.TRIANGLE, this.p1Dir),
      new PieceM(this.props.pos, PieceTypes.SQUARE),
      new PieceM(this.props.pos, PieceTypes.SQUARE),
      new PieceM(this.props.pos, PieceTypes.TRIANGLE, this.p2Dir),
    ];
  }
}
