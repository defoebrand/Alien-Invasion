import {
  GameText
} from '../Objects/GameText'
import {
  kill
} from '../Helpers/gameLogic'
import {
  addScores
} from '/src/Conf/leaderAPI.js'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.add.image(400, 300, 'logo');

    this.zone = this.add.zone(800 / 2, 0);

    this.gameOverText = new GameText(this, 0, 50, 'Game Over', this.zone, '50px', '#d90922')

    this.thanksText = new GameText(this, 0, 560, 'Thanks for Playing!', this.zone, '26px', '#fff')

    this.finalScoreText = new GameText(this, 0, 500, `${localStorage['name']}: ${this.model.score} pts`, this.zone, '26px', '#fff')

    this.gameOverText.setY(150);
    this.finalScoreText.setY(515);

    this.gameOverTween = this.tweens.add({
      targets: this.gameOverText,
      y: 50,
      ease: 'Power1',
      duration: 2500,
      delay: 500,
      onComplete: function(tween, targets) {
        addScores(localStorage['name'], targets[0].scene.model.score)
        this.destroy;
      }
    });

    this.finalScoreTween = this.tweens.add({
      targets: this.finalScoreText,
      y: 90,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function() {
        this.finalScoreTween.destroy;
        this.scene.start('LeaderBoard');
      }.bind(this)
    });
  }
}