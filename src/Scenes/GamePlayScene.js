import GameText from '../Objects/GameText'
import {
  Character
} from '../Objects/Characters'

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {

    this.model = this.sys.game.globals.model;
    // this.charSelect = localStorage['charSelect'];

    // this.model.charSelect = 'soldier';
    //
    // if (this.model.charSelect === 'soldier') {
    //   enemySelection = 'alien'
    //   gunHeight = 18;
    //   enemyGunHeight = 0
    // } else if (this.model.charSelect === 'alien') {
    //   enemySelection = 'soldier'
    //   gunHeight = 0;
    //   enemyGunHeight = 18;
    // } else {
    //   enemySelection = 'alien'
    //   gunHeight = 0;
    //   enemyGunHeight = 0;
    // }
    if (this.model.charSelect === 'soldier') {
      this.model.enemyImage = 'alien'
    }

    // this.model.playerImage = ?

  }
  create() {

    this.add.image(400, 300, 'sky');

    this.model.platforms = this.physics.add.staticGroup();
    this.model.ground = this.physics.add.staticGroup();

    this.model.ground.create(400, 568, 'ground').setScale(3).refreshBody();

    for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
      this.model.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(200, 400), 'platform');
    }


    this.model.player = new Character(this, 100, 475, this.model.charSelect);
    this.physics.add.collider(this.model.player, this.model.platforms);
    this.physics.add.collider(this.model.player, this.model.ground);
    // this.physics.add.overlap(this.model.player, this.model.enemies, gameReset, null, this);

    this.model.enemies = this.physics.add.group();
    this.model.enemy = new Character(this, 375, 100, this.model.enemyImage)
    this.model.enemies.add(this.model.enemy)

    // this.physics.add.collider(this.model.enemies, this.model.ground, chasePlayer, null, this);
    // this.physics.add.collider(this.model.enemies, this.model.platforms, chasePlayer, null, this);

    this.model.bombs = this.physics.add.group();
    this.physics.add.collider(this.model.bombs, this.model.platforms);
    this.physics.add.collider(this.model.bombs, this.model.ground);
    // this.physics.add.collider(player, this.model.bombs, hitBomb, null, this);

    this.model.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000'
    });
    this.model.timerText = this.add.text(650, 16, 'Time: 0', {
      fontSize: '22px',
      fill: '#000'
    });
  }

}