import * as React from 'react';
import { PropTypes } from 'prop-types';

import PieceTypes from '../utils/PieceTypes'
import PieceM from '../models/PieceM';
import Ship from './Ship';

export default class Submarine extends Ship {
  name = 'Submrine';
  constructor(props){
    super(props);
    this.state = {
      pieces: this.pieces()
    };
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
