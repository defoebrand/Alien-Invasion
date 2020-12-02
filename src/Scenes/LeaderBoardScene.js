import {
  getScores,
} from '../Conf/leaderAPI'
import {
  GameText
} from '../Objects/GameText'


export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.zone = this.add.zone(800 / 2, 0);

    this.highScoreText = new GameText(this, 0, 25, 'Top Ten Scores', this.zone, '26px', '#fff')

    this.highScoreTween = this.tweens.add({
      targets: this.highScoreText,
      y: -100,
      ease: 'Power1',
      duration: 2500,
      delay: 1500,
      onComplete: function() {
        this.destroy;

        getScores().then(scores => {
          scores.result.sort((a, b) => {
            return b.score - a.score;
          }).slice(0, 10).forEach((player, ind) => {
            this.playerScoresText = new GameText(this, 0, 100 + (ind * 100), `${player.user}: ${player.score}`, this.zone, '32px', '#fff')

            this.playerScoresTween = this.tweens.add({
              targets: this.playerScoresText,
              y: -1000 + (ind * 100),
              ease: 'Power1',
              duration: 7500,
              delay: 1500,
              onComplete: function() {
                this.destroy;
              }.bind(this)
            });
          });
        });
        this.scene.start('Credits');
      }.bind(this)
    });

  }
};