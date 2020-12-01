import {
  getScores
} from '../Conf/leaderAPI'

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  preload() {
    // createGame('AVP-Shooter-test')
  }

  create() {
    getScores(this)
  }
  update() {

  }
};