import GameText from '../Objects/GameText'
import {
  Character
} from '../Objects/Characters'
import {
  Artillery
} from '../Objects/Artillery'
import {
  chasePlayer,
  destroy
} from '../Helpers/gameLogic'

export default class GamePlayScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {
    this.model = this.sys.game.globals.model;
    // this.charSelect = localStorage['charSelect'];
    //
    if (this.model.charSelect === 'soldier') {
      this.model.enemySelect = 'alien'
      this.model.gunHeight = 18;
      this.model.enemyGunHeight = 0
    } else if (this.model.charSelect === 'alien') {
      this.model.enemySelect = 'soldier'
      this.model.gunHeight = 0;
      this.model.enemyGunHeight = 18;
    } else {
      this.model.enemySelect = 'alien'
      this.model.gunHeight = 0;
      this.model.enemyGunHeight = 0;
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

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{
    //     key: `${characterSelection}`,
    //     frame: 0
    //   }],
    //   frameRate: 20,
    // });

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
      key: 'enemyExplosion',
      frames: this.anims.generateFrameNumbers(`${this.model.charSelect}BulletExplosion`, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'enemyShoot',
      frames: [{
        key: `${this.model.enemySelect}Shoot`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'enemyShootLeft',
      frames: [{
        key: `${this.model.enemySelect}ShootLeft`,
        frame: 4
      }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'enemyExplosion',
      frames: this.anims.generateFrameNumbers(`${this.model.enemySelect}BulletExplosion`, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

  }
  create() {
    this.add.image(400, 300, 'sky');

    this.model.ground = this.physics.add.staticGroup();
    this.model.ground.create(400, 568, 'ground').setScale(3).refreshBody();


    this.model.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
      this.model.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(200, 400), 'platform');
    }

    this.model.player = new Character(this, 100, 475, this.model.charSelect);
    this.model.lastDirection = 'right'
    this.physics.add.collider(this.model.player, this.model.platforms);
    this.physics.add.collider(this.model.player, this.model.ground);

    this.model.enemy = new Character(this, 375, 100, `${this.model.enemySelect}Left`, this.model.player)

    this.model.enemies = this.physics.add.group();
    this.physics.add.collider(this.model.enemies, this.model.player);
    // this.physics.add.overlap(this.model.player, this.model.enemies, gameReset, null, this);
    this.physics.add.collider(this.model.enemies, this.model.ground);
    // this.physics.add.collider(this.model.enemies, this.model.ground, chasePlayer(this.model.enemy, this.model.player, this), null, this);
    // this.physics.add.collider(this.model.enemies, this.model.platforms);
    // this.physics.add.collider(this.model.enemies, this.model.platforms, chasePlayer, null, this);
    this.model.enemies.add(this.model.enemy)

    this.model.bullets = this.physics.add.group({
      allowGravity: false,
    });
    this.physics.add.collider(this.model.bullets, this.model.enemies, destroy, null, this);
    // this.physics.add.collider(bullets, enemies, destroyEnemies, null, this);
    this.physics.add.collider(this.model.bullets, this.model.platforms);
    // this.physics.add.collider(bullets, platforms,  explode, null, this);
    this.physics.add.collider(this.model.bullets, this.model.bombs);
    // this.physics.add.collider(bullets, bombs, destroy, null, this);

    this.model.bombs = this.physics.add.group();
    this.physics.add.collider(this.model.bombs, this.model.ground);
    this.physics.add.collider(this.model.bombs, this.model.platforms);
    this.physics.add.collider(this.model.bombs, this.model.player);
    // this.physics.add.collider(player, this.model.bombs, hitBomb, null, this);

    this.zone = this.add.zone(800 / 2, 0);

    this.model.scoreText = new GameText(this, -300, 25, 'Score: 0', this.zone, '32px', '#000')

    this.model.timerText = new GameText(this, 325, 25, 'Time: 0', this.zone, '22px', '#000')

    this.model.cursors = this.input.keyboard.createCursorKeys();
    this.model.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.model.shootTimer = 0;
    this.model.round = 0;
  }

  update() {
    this.model.shootTimer++;

    if ((this.model.enemy.x - this.model.player.x) >= 0) {
      this.model.enemy.anims.play('enemyShootLeft')
      this.model.enemyDirection = 'left'
      // this.model.enemyImage = `${this.model.enemySelect}Left`
    } else {
      this.model.enemy.anims.play('enemyShoot')
      this.model.enemyDirection = 'right'
      // this.model.enemyImage = `${this.model.enemySelect}`
    }

    if (this.model.shootTimer % 100 === 0) {
      this.model.enemyBullet = new Artillery(this, this.model.enemy.x, this.model.enemy.y - this.model.enemyGunHeight, `${this.model.enemySelect}Bullet`)
      this.physics.add.collider(this.model.enemyBullet, this.model.player)
      if (this.model.enemyDirection === 'left') {
        this.model.enemyBullet.body.setVelocity(-300, 0);
      } else {
        this.model.enemyBullet.body.setVelocity(300, 0);
      }
      // this.model.bullets.add(this.model.enemyBullet)
      // this.physics.add.collider(enemyBullet, player, gameReset, null, this);
    }


    if (this.model.cursors.left.isDown) {
      this.model.player.body.setVelocityX(-160);
      this.model.lastDirection = 'left'
      this.model.player.anims.play(this.model.lastDirection, true);
    } else if (this.model.cursors.right.isDown) {
      this.model.player.body.setVelocityX(160);
      this.model.lastDirection = 'right'
      this.model.player.anims.play(this.model.lastDirection, true);
    } else {
      this.model.player.body.setVelocityX(0);
      this.model.player.anims.play(this.model.lastDirection);
    }

    if (this.model.cursors.up.isDown) {
      if (this.model.lastDirection === 'left') {
        this.model.player.anims.play('jumpLeft', true);
      } else {
        this.model.player.anims.play('jump', true);
      }
      if (this.model.player.body.touching.down) {
        this.model.player.body.setVelocityY(-330);
      }
    }


    if (this.model.cursors.space.isDown) {
      if (Phaser.Input.Keyboard.JustDown(this.model.spacebar)) {
        this.model.bullet = new Artillery(this, this.model.player.x, this.model.player.y - this.model.enemyGunHeight, `${this.model.charSelect}Bullet`)
        this.model.bullets.add(this.model.bullet)
        if (this.model.lastDirection === 'left') {
          this.model.bullet.body.setVelocity(-300, 0);
        } else {
          this.model.bullet.body.setVelocity(300, 0);
        }
      }
    }

    // this.bulletPhaseOut = this.time.delayedCall(2250, kill, [bullet, ''], this);
    // }


    if (this.model.enemies.countActive(true) === 0) {
      this.model.round += 1


      if (this.model.round % 2 === 0) {
        this.model.platforms.children.iterate(function(child) {
          child.disableBody(true, true);
        });

        for (let i = 0; i < Phaser.Math.Between(1, 3); i++) {
          this.model.platforms.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(200, 400), 'platform');
        }
      }

      // for (let i = 0; i < this.model.round; i++) {
      this.model.enemy = new Character(this, (5 + (Phaser.Math.Between(0, 99)) * (this.model.round % 8)), Phaser.Math.Between(50, 475), this.model.enemyImage)
      this.model.enemies.add(this.model.enemy)
      // }


      this.model.x = (this.model.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      this.model.bomb = new Artillery(this, this.model.x, 16, 'bomb')
      this.model.bombs.add(this.model.bomb)
      this.model.bomb.body.setVelocity(Phaser.Math.Between(-200, 200), 20);
      this.model.bomb.body.setBounce(1);
      this.model.bomb.body.setCollideWorldBounds(true);
      this.model.bomb.body.setAllowGravity = false;
    }
  }

}