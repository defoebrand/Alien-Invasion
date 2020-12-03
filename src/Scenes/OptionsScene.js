import Button from '../Objects/Button'
import {
  GameText
} from '../Objects/GameText'

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.zone = this.add.zone(800 / 2, 600 / 2);

    this.optionsTitle = new GameText(this, 0, -125, 'Options', this.zone, '32px', '#fff')

    this.musicButton = this.add.image(300, 250, 'boxChecked');

    this.musicText = new GameText(this, 25, -50, 'Music Enabled', this.zone, '24px', '#fff')

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.updateAudio();

    this.menuButton = new Button(this, 400, 500, 'buttonEmpty', 'buttonArrow', 'Main Menu', 'Title');

  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('boxUnchecked');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('boxChecked');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

  }

}
