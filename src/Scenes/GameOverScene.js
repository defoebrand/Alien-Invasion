import GameText from '../Objects/GameText'
import {
  kill
} from '../Helpers/gameLogic'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  create() {
    this.zone = this.add.zone(800 / 2, 0);

    this.gameOverTextShadowL1 = new GameText(this, -1, (600 / 2) - 151, 'Game Over', this.zone, '50px', '#000')
    this.gameOverTextShadowR1 = new GameText(this, 1, (600 / 2) - 149, 'Game Over', this.zone, '50px', '#000')
    this.gameOverTextShadowL2 = new GameText(this, -1, (600 / 2) - 149, 'Game Over', this.zone, '50px', '#000')
    this.gameOverTextShadowR2 = new GameText(this, 1, (600 / 2) - 151, 'Game Over', this.zone, '50px', '#000')

    this.gameOverText = new GameText(this, 0, (600 / 2) - 150, 'Game Over', this.zone, '50px', '#d90922')

    this.time.delayedCall(2250, kill, [this.gameOverText, ''], this);
    this.time.delayedCall(2250, kill, [this.gameOverTextShadowL1, ''], this);
    this.time.delayedCall(2250, kill, [this.gameOverTextShadowR1, ''], this);
    this.time.delayedCall(2250, kill, [this.gameOverTextShadowL2, ''], this);
    this.time.delayedCall(2250, kill, [this.gameOverTextShadowR2, ''], this);

    //   // this.scoreText = new GameText(this, -300, 25, 'Score: 0', this.zone, '32px', '#000')
    //

    this.thanksText = new GameText(this, 0, 560, 'Thanks for Playing!', this.zone, '26px', '#fff')

    this.scoreText = new GameText(this, 0, 500, `${localStorage['name']}: ${localStorage['previousScore']} pts`, this.zone, '26px', '#fff')

    this.scoreText.setY(650);


    this.scoreTween = this.tweens.add({
      targets: this.scoreText,
      y: 160,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function() {
        this.scoreTween.destroy;
        this.scene.start('LeaderBoard');
      }.bind(this)
    });
  }
}