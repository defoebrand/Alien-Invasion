import GameText from '../Objects/GameText'
import {
  kill
} from '../Helpers/gameLogic'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  create() {
    this.model = this.sys.game.globals.model;

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

    this.thanksText = new GameText(this, 0, 560, 'Thanks for Playing!', this.zone, '26px', '#fff')
    this.finalScoreText = new GameText(this, 0, 500, `${localStorage['name']}: ${this.model.score} pts`, this.zone, '26px', '#fff')

    this.finalScoreText.setY(500);


    this.finalScoreTween = this.tweens.add({
      targets: this.finalScoreText,
      y: 160,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function() {
        console.log(this)
        this.finalScoreTween.destroy;
        this.scene.start('LeaderBoard');
      }.bind(this)
    });

  }
}