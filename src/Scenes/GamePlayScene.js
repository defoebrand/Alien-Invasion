import GameText from '../Objects/GameText'
import Character from '../Objects/Characters'
import Artillery from '../Objects/Artillery'
import {
  chasePlayer,
  destroyEnemy,
  explode,
  gameReset,
  killPlayer,
  kill
} from '../Helpers/gameLogic'

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {
    this.model = this.sys.game.globals.model;

    if (this.model.charSelect === 'soldier') {
      this.enemySelect = 'alien'
      this.model.gunHeight = 18;
      this.enemyGunHeight = 0
    } else if (this.model.charSelect === 'alien') {
      this.enemySelect = 'soldier'
      this.model.gunHeight = 0;
      this.enemyGunHeight = 18;
    } else {
      this.enemySelect = 'alien'
      this.model.gunHeight = 0;
      this.enemyGunHeight = 0;
    }

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}Left`, {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}`, {
        start: 6,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: [{
        key: `${this.model.charSelect}Jump`,
        frame: 0
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'jumpLeft',
      frames: [{
        key: `${this.model.charSelect}JumpLeft`,
        frame: 0
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'shoot',
      frames: [{
        key: `${this.model.charSelect}Shoot`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'shootLeft',
      frames: [{
        key: `${this.model.charSelect}ShootLeft`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'playerExplosion',
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}BulletExplosion`, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'playerDeath',
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}Left`, {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'enemyShoot',
      frames: [{
        key: `${this.enemySelect}Shoot`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'enemyShootLeft',
      frames: [{
        key: `${this.enemySelect}ShootLeft`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'enemyExplosion',
      frames: this.anims.generateFrameNumbers(`${this.enemySelect}BulletExplosion`, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

  }

  create() {
    this.add.image(400, 300, 'sky');

    this.ground = this.physics.add.staticGroup();
    this.ground.create(400, 568, 'ground').setScale(3).refreshBody();

    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
      this.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(200, 400), 'platform');
    }

    this.player = new Character(this, 100, 475, this.model.charSelect);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.ground);

    this.enemy = new Character(this, 375, 100, `${this.enemySelect}Left`)

    this.enemies = this.physics.add.group();
    this.physics.add.collider(this.enemies, this.ground, chasePlayer, null, this);
    this.physics.add.collider(this.enemies, this.platforms, chasePlayer, null, this);
    this.enemies.add(this.enemy)

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.bombs, this.ground);
    this.physics.add.overlap(this.bombs, this.player, killPlayer, null, this);

    this.bullets = this.physics.add.group({
      allowGravity: false
    });
    this.physics.add.collider(this.bullets, this.platforms, explode, null, this);
    this.physics.add.collider(this.bullets, this.enemies, destroyEnemy, null, this);
    this.physics.add.collider(this.bullets, this.bombs, destroyEnemy, null, this);

    this.zone = this.add.zone(800 / 2, 0);

    this.scoreText = new GameText(this, -300, 25, 'Score: 0', this.zone, '32px', '#000')

    this.timerText = new GameText(this, 300, 25, 'Time: 0', this.zone, '22px', '#000')

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.shootTimer = 0;
    this.round = 0;
    this.score = 0;
    this.countdown = 500;
    this.lastDirection = 'right'
    this.playerDead = false;
  }

  update() {
    if (this.enemies.countActive(true) === 0) {
      this.round += 1
      this.score += 10;
      this.countdown += 1000;

      this.scoreText.text.setText('Score: ' + this.score);

      if (this.round % 2 === 0) {
        this.platforms.children.iterate(function(child) {
          child.disableBody(true, true);
        });
        for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
          this.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(75, 450), 'platform');
        }
      }

      // // for (let i = 0; i < Math.ceil(this.round / 3); i++) {
      this.newEnemy = new Character(this, 400, 300, this.enemyImage)
      this.enemies.add(this.newEnemy)
      // // }

      this.positionX = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      if (this.round % 5 === 0) {
        this.bomb = new Artillery(this, this.positionX, 16, 'bomb')
        this.bombs.add(this.bomb)
        this.bomb.body.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.bomb.body.setBounce(1);
        this.bomb.body.setCollideWorldBounds(true);
      }

    } else if (this.playerDead === true) {
      this.physics.pause();
      this.player.destroy();
      this.model.score = this.score;
      this.time.delayedCall(50, gameReset, [], this);

    } else {
      this.shootTimer++;
      this.countdown--
      this.timerText.text.setText('Time: ' + (this.countdown / 100).toFixed(0) + ' s');

      if (this.countdown === 0) {
        this.gameOverTextShadowR = new GameText(this, 1, 600 / 2 - 225, 'Out of Time!', this.zone, '28px', '#000')
        this.playerDead = true;
      }

      // if (this.shootTimer % 250 === 0) {
      //   for (let i = 0; i < Math.floor(this.round / 2); i++) {
      //     this.enemy = new Character(this, 0, 0, this.enemyImage)
      //     this.enemies.add(this.enemy)
      //   }
      // }

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-160);
        this.lastDirection = 'left'
        this.player.anims.play(this.lastDirection, true);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(160);
        this.lastDirection = 'right'
        this.player.anims.play(this.lastDirection, true);
      } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play(this.lastDirection);
      }
      if (this.cursors.up.isDown) {
        if (this.lastDirection === 'left') {
          this.player.anims.play('jumpLeft', true);
        } else {
          this.player.anims.play('jump', true);
        }
        if (this.player.body.touching.down) {
          this.player.body.setVelocityY(-330);
        }
      }
      if (this.cursors.space.isDown) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
          this.bullet = new Artillery(this, this.player.x, this.player.y - this.model.gunHeight, `${this.model.charSelect}Bullet`)
          this.bullets.add(this.bullet)
          this.time.delayedCall(2250, explode, [this.bullet, ''], this);
          if (this.lastDirection === 'left') {
            this.bullet.body.setVelocity(-300, 0);
          } else {
            this.bullet.body.setVelocity(300, 0);
          }
        }
      }
    }
  }
}