import {
  GameText,
  TextBorder
} from '../Objects/GameText'
import Character from '../Objects/Characters'
import Artillery from '../Objects/Artillery'
import {
  chasePlayer,
  destroyEnemy,
  explode,
  killPlayer,
} from '../Helpers/gameLogic'

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {
    this.model = this.sys.game.globals.model;
    this.player = ''

    if (this.model.charSelect === 'soldier') {
      this.enemySelect = 'alien'
      this.gunHeight = 18;
      this.enemyGunHeight = 0
    } else if (this.model.charSelect === 'alien') {
      this.enemySelect = 'soldier'
      this.gunHeight = 0;
      this.enemyGunHeight = 18;
    } else {
      this.enemySelect = 'alien'
      this.gunHeight = 0;
      this.enemyGunHeight = 0;
    }


    this.anims.create({
      key: `${this.model.charSelect}Left`,
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}Left`, {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: `${this.model.charSelect}Right`,
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}`, {
        start: 6,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: `${this.model.charSelect}Jump`,
      frames: [{
        key: `${this.model.charSelect}Jump`,
        frame: 0
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.model.charSelect}JumpLeft`,
      frames: [{
        key: `${this.model.charSelect}JumpLeft`,
        frame: 0
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.model.charSelect}Shoot`,
      frames: [{
        key: `${this.model.charSelect}Shoot`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.model.charSelect}ShootLeft`,
      frames: [{
        key: `${this.model.charSelect}ShootLeft`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.model.charSelect}BulletExplosion`,
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}BulletExplosion`, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: `${this.model.charSelect}Death`,
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}Left`, {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: `${this.enemySelect}Shoot`,
      frames: [{
        key: `${this.enemySelect}Shoot`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.enemySelect}ShootLeft`,
      frames: [{
        key: `${this.enemySelect}ShootLeft`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: `${this.enemySelect}BulletExplosion`,
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

    this.player = new Character(this, 100, 475, `${this.model.charSelect}Right`);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.ground);


    this.enemies = this.physics.add.group();
    this.physics.add.collider(this.enemies, this.ground, chasePlayer, null, this);
    this.physics.add.collider(this.enemies, this.platforms, chasePlayer, null, this);

    this.enemy = new Character(this, 400, 200, `${this.enemySelect}Left`)
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
    this.model.score = 0;
    this.countdown = 500;
    this.lastDirection = 'Right'
    this.playerDead = false;
  }

  update() {
    if (this.enemies.countActive(true) === 0) {
      this.round += 1
      this.model.score += 10;
      this.countdown = 1000;

      this.scoreText.text.setText('Score: ' + this.model.score);

      this.positionX = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      if (this.round % 3 === 0) {
        this.platforms.children.iterate(function(child) {
          child.disableBody(true, true);
        });
        for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
          this.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(75, 450), 'platform');
        }
      }

      if (this.round % 2 === 0) {
        this.bomb = new Artillery(this, this.positionX, 16, 'bomb')
        this.bombs.add(this.bomb)
        this.bomb.body.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.bomb.body.setBounce(1);
        this.bomb.body.setCollideWorldBounds(true);
      }

      for (let i = 0; i < (this.round % 2) + 1; i++) {
        this.enemy = new Character(this, Phaser.Math.Between(300, 500), Phaser.Math.Between(100, 500), `${this.enemySelect}Left`)
        this.enemies.add(this.enemy)
      }

    } else if (this.playerDead === true) {
      this.physics.pause();
      this.time.delayedCall(250, killPlayer, ['', this.player], this);

      this.gameOverTextBorder = new TextBorder(this, 0, (600 / 2) - 150, 'Game Over', this.zone, '50px', '#000')

      this.gameOverText = new GameText(this, 0, (600 / 2) - 150, 'Game Over', this.zone, '50px', '#d90922')

    } else {
      this.shootTimer++;
      this.countdown--
      this.timerText.text.setText('Time: ' + (this.countdown / 100).toFixed(0) + ' s');

      if (this.countdown === 0) {
        this.outOfTime = new GameText(this, 1, 600 / 2 - 225, 'Out of Time!', this.zone, '28px', '#000')
        this.playerDead = true
      }

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-160);
        this.lastDirection = 'Left'
        this.player.anims.play(`${this.model.charSelect}${this.lastDirection}`, true);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(160);
        this.lastDirection = 'Right'
        this.player.anims.play(`${this.model.charSelect}${this.lastDirection}`, true);
      } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play(`${this.model.charSelect}${this.lastDirection}`);
      }
      if (this.cursors.up.isDown) {
        if (this.player.body.touching.down) {
          this.player.body.setVelocityY(-330);
        }
        if (this.lastDirection === 'Left') {
          this.player.anims.play(`${this.model.charSelect}JumpLeft`, true);
        } else {
          this.player.anims.play(`${this.model.charSelect}Jump`, true);
        }
      }
      if (this.cursors.space.isDown) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
          this.bullet = new Artillery(this, this.player.x, this.player.y - this.gunHeight, `${this.model.charSelect}Bullet`)
          this.bullets.add(this.bullet)
          this.time.delayedCall(2250, explode, [this.bullet], this);
          if (this.lastDirection === 'Left') {
            this.bullet.body.setVelocity(-300, 0);
          } else {
            this.bullet.body.setVelocity(300, 0);
          }
        }
      }
    }
  }
}