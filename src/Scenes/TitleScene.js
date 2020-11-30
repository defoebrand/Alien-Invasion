// import 'phaser';
import Button from '../Objects/Button'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.gameButton = new Button(this, 800 / 2, 600 / 2 - 200, 'buttonEmpty', 'buttonArrow', 'Play', 'CharacterSelect');
  }
}