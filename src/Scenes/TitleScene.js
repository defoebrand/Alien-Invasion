// import 'phaser';
import Button from '../Objects/Button'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.gameButton = new Button(this, 800 / 2, 600 / 2 - 200, 'buttonEmpty', 'buttonArrow', 'Play', 'CharacterSelect');
    this.optionsButton = new Button(this, 800 / 2, 600 / 2 - 68, 'buttonEmpty', 'buttonArrow', 'Options', 'Options');
    this.leaderButton = new Button(this, 800 / 2, 600 / 2 + 67, 'buttonEmpty', 'buttonArrow', 'LeaderBoard', 'LeaderBoard');
    this.creditsButton = new Button(this, 800 / 2, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'Credits', 'Credits');
  }
}