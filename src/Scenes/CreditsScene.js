// import 'phaser'

import GameText from '../Objects/Text'

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }
  create() {
    this.zone = this.add.zone(800 / 2, 600 / 2);

    this.creditsText = new GameText(this, 0, 0, 'Credits', this.zone)

    this.madeByText = new GameText(this, 0, 0, 'Created By: Brandon', this.zone)

    this.plugText = new GameText(this, 0, 0, 'www.defoebrand.com', this.zone)

    this.madeByText.setY(325);

    this.plugText.setY(375);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2500,
      delay: 1000,
      onComplete: function() {
        this.creditsTween.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete: function() {
        this.madeByTween.destroy;
      }.bind(this)
    });

    this.plugTween = this.tweens.add({
      targets: this.plugText,
      y: -175,
      ease: 'Power1',
      duration: 7500,
      delay: 1500,
      onComplete: function() {
        this.plugTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

  }
}