import * as React from 'react';
import { PropTypes } from 'prop-types';

import PieceTypes from '../utils/PieceTypes'
import PieceModel from '../models/PieceModel';
import Ship from './Ship';

const PieceM = PieceModel.PieceM;
export default class Submarine extends Ship {
  name = 'Submrine';
  constructor(props){
    super(props);
  }
  render(){
    return this.renderSuper();
  }
  pieces(){
    return [
      new PieceM(this.props.pos, PieceTypes.CIRCLE)
    ];
  }
}
