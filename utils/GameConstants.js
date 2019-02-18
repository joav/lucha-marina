import { Dimensions, StatusBar } from 'react-native';
import * as Expo from 'expo'

class GameConstants{
  static instace = null;
  constructor(){
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    this.stHeight = StatusBar.currentHeight;
    this.tableSize = Dimensions.get('screen').height - 50;
    this.pieceSize = this.tableSize / 10;
    this.pieceSize2 = this.pieceSize / 2;
  }
  static getInstance(){
    if(GameConstants.instace === null){
      GameConstants.instace = new GameConstants();
    }
    return this.instace;
  }
}

let gameConstants = GameConstants.getInstance();
export default gameConstants;