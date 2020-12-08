import Phaser from 'phaser';
import {
  getScores,
} from '../Conf/leaderAPI';
import GameText from '../Objects/GameText';
import Button from '../Objects/Button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.zone = this.add.zone(800 / 2, 0);
    this.skipButton = new Button(this, 750, 25, 'buttonEmpty', 'buttonEmpty', 'Skip', 'Credits');

    this.highScoreText = new GameText(this, 0, 25, 'Top Ten Scores', this.zone, '26px', '#fff');
    this.highScoreTween = this.tweens.add({
      targets: this.highScoreText,
      y: -100,
      ease: 'Power1',
      duration: 2000,
      delay: 1000,
      onComplete: () => {
        getScores().then(scores => {
          scores.result.sort((a, b) => b.score - a.score).slice(0, 10).forEach((player, ind) => {
            this.playerScoresText = new GameText(this, 0, 100 + (ind * 100), `${player.user}: ${player.score}`, this.zone, '32px', '#fff');
            this.playerScoresTween = this.tweens.add({
              targets: this.playerScoresText,
              y: -1000 + (ind * 100),
              ease: 'Power1',
              duration: 7500,
              delay: 1500,
              onComplete: () => {
                this.scene.start('Credits');
              },
            });
          });
        }).catch(() => {
          this.scene.start('Credits');
        });
      },
    });
  }
}
