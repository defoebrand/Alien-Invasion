import {
  GameText,
} from '../Objects/GameText'
import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.zone = this.add.zone(800 / 2, 600 / 2);
    this.creditsText = new GameText(this, 0, 0, 'Credits', this.zone, '32px', '#fff');
    this.madeByText = new GameText(this, 0, 0, 'Created By: Brandon', this.zone, '32px', '#fff');
    this.plugText = new GameText(this, 0, 0, 'www.defoebrand.com', this.zone, '32px', '#fff');
    this.madeByText.setY(325);
    this.plugText.setY(325);
    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2500,
      delay: 1000,
    });
    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 0,
      ease: 'Power1',
      duration: 3750,
      delay: 1000,
    });
    this.plugTween = this.tweens.add({
      targets: this.plugText,
      y: 100,
      ease: 'Power1',
      duration: 5000,
      delay: 2500,
      onComplete: () => {
        this.scene.start('Title');
      }
    });
  }
}
