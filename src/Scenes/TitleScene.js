import Button from '../Objects/Button'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.model = this.sys.game.globals.model;

    this.gameButton = new Button(this, 800 / 2, 600 / 2 - 200, 'buttonEmpty', 'buttonArrow', 'Play', 'CharacterSelect');
    this.optionsButton = new Button(this, 800 / 2, 600 / 2 - 68, 'buttonEmpty', 'buttonArrow', 'Options', 'Options');
    this.leaderButton = new Button(this, 800 / 2, 600 / 2 + 67, 'buttonEmpty', 'buttonArrow', 'LeaderBoard', 'LeaderBoard');
    this.creditsButton = new Button(this, 800 / 2, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'Credits', 'Credits');

    if (this.model.musicOn === false &&
      this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', {
        volume: 0.5,
        loop: true
      });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic
    }
  }
}