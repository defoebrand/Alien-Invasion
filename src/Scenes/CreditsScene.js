import GameText from '../Objects/GameText'

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

    this.plugText.setY(325);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2500,
      delay: 1000
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 0,
      ease: 'Power1',
      duration: 3750,
      delay: 1000
    });

    this.plugTween = this.tweens.add({
      targets: this.plugText,
      y: 100,
      ease: 'Power1',
      duration: 7500,
      delay: 3750,
      onComplete: function() {
        this.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

  }
}