import PieceStyle from '../utils/PieceStyles';
import PieceTypes from '../utils/PieceTypes';
import Directions from '../utils/Directions';

export default class PieceM{
  constructor(pos, type, dir = null){
    this.hit = false;
    this.pos = pos;
    this.type = type;
    this.dir = dir;
  }
  style(){
    let resultStyles = null;
    switch(this.type){
      case PieceTypes.CIRCLE:
        resultStyles = PieceStyle.circle;
        break;
      case PieceTypes.TRIANGLE:
        resultStyles = {...PieceStyle.triangle, ...PieceStyle[`triangle${this.dir}`]};
        break;
      case PieceTypes.SQUARE:
        resultStyles = PieceStyle.square;
        break;
    }
    return resultStyles;
  }
  styleHit(){
    let resultStyles = null;
    switch(this.type){
      case PieceTypes.CIRCLE:
        resultStyles = circleHit;
        break;
      case PieceTypes.TRIANGLE:
        resultStyles = {...PieceStyle.hit,
          ...PieceStyle.triangle,
          ...PieceStyle[`triangle${this.dir}`],
          ...PieceStyle[`triangleHit${this.dir}`]};
        break;
      case PieceTypes.SQUARE:
        resultStyles = squareHit;
        break;
    }
    return resultStyles;
  }
  setHit(hit){
    this.hit = hit;
  }
}

const circleHit = {...PieceStyle.circle, ...PieceStyle.circleHit, ...PieceStyle.hit};
const squareHit = {...PieceStyle.square, ...PieceStyle.squareHit, ...PieceStyle.hit};

function styleHit(piece){
  let resultStyles = null;
  switch(piece.type){
    case PieceTypes.CIRCLE:
      resultStyles = circleHit;
      break;
    case PieceTypes.TRIANGLE:
      resultStyles = {...PieceStyle.hit,
        ...PieceStyle.triangle,
        ...PieceStyle[`triangle${piece.dir}`],
        ...PieceStyle[`triangleHit${piece.dir}`]};
      break;
    case PieceTypes.SQUARE:
      resultStyles = squareHit;
      break;
  }
  return resultStyles;
}

function styleHit(piece){
  let resultStyles = null;
  switch(piece.type){
    case PieceTypes.CIRCLE:
      resultStyles = circleHit;
      break;
    case PieceTypes.TRIANGLE:
      resultStyles = {...PieceStyle.hit,
        ...PieceStyle.triangle,
        ...PieceStyle[`triangle${piece.dir}`],
        ...PieceStyle[`triangleHit${piece.dir}`]};
      break;
    case PieceTypes.SQUARE:
      resultStyles = squareHit;
      break;
  }
  return resultStyles;
}