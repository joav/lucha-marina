import * as React from 'react';
import { StyleSheet } from 'react-native';

import gameConstants from './GameConstants';

const colorBase = '#000';
const hitColor = '#FF0000';

const PieceStyle = StyleSheet.create({
  circle: {
    width: gameConstants.pieceSize,
    height: gameConstants.pieceSize,
    backgroundColor: colorBase,
    borderRadius: gameConstants.pieceSize / 2,
  },
  circleHit:{
    backgroundColor: hitColor,
  },
  triangle:{
    width: 0,
    height: 0,
  },
  triangle0: {
    borderBottomWidth: gameConstants.pieceSize,
    borderBottomColor: colorBase,
    borderLeftWidth: gameConstants.pieceSize2,
    borderLeftColor: 'transparent',
    borderRightWidth: gameConstants.pieceSize2,
    borderRightColor: 'transparent'
  },
  triangleHit0: {
    borderBottomColor: hitColor,
  },
  triangle1: {
    borderLeftWidth: gameConstants.pieceSize,
    borderLeftColor: colorBase,
    borderBottomWidth: gameConstants.pieceSize2,
    borderBottomColor: 'transparent',
    borderTopWidth: gameConstants.pieceSize2,
    borderTopColor: 'transparent'
  },
  triangleHit1: {
    borderLeftColor: hitColor,
  },
  triangle2: {
    borderTopWidth: gameConstants.pieceSize,
    borderTopColor: colorBase,
    borderLeftWidth: gameConstants.pieceSize2,
    borderLeftColor: 'transparent',
    borderRightWidth: gameConstants.pieceSize2,
    borderRightColor: 'transparent'
  },
  triangleHit2: {
    borderTopColor: hitColor,
  },
  triangle3: {
    borderRightWidth: gameConstants.pieceSize,
    borderRightColor: colorBase,
    borderBottomWidth: gameConstants.pieceSize2,
    borderBottomColor: 'transparent',
    borderTopWidth: gameConstants.pieceSize2,
    borderTopColor: 'transparent'
  },
  triangleHit3: {
    borderRightColor: hitColor,
  },
  square: {
    width: gameConstants.pieceSize,
    height: gameConstants.pieceSize,
    backgroundColor: colorBase
  },
  squareHit: {
    backgroundColor: hitColor
  },
  hit: {
    opacity: 0.5
  }
});

export default PieceStyle;