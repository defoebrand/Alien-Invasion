import Phaser from 'phaser';
import Artillery from '../Objects/Artillery';
import GameText from '../Objects/GameText';
import TextBorder from '../Objects/TextBorder';
import Button from '../Objects/Button';

export const gameReset = (scene) => {
  scene.zone = scene.add.zone(800 / 2, 0);

  scene.gameOverText = new TextBorder(scene, 0, (600 / 2) - 50, 'Would you like to play again?', scene.zone, '15px', '#d90922');

  scene.gameOverText = new GameText(scene, 0, (600 / 2) - 50, 'Would you like to play again?', scene.zone, '15px', 'black');

  scene.yesButton = new Button(scene, 250, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'Yes', 'CharacterSelect');

  scene.noButton = new Button(scene, 550, 600 / 2 + 200, 'buttonEmpty', 'buttonArrow', 'No', 'GameOver');
};

export const kill = (objectOne, objectTwo) => {
  if (objectOne) {
    objectOne.destroy();
  }
  if (objectTwo) {
    objectTwo.destroy();
  }
};

export const explode = (bullet) => {
  const { Game } = window.game.scene.keys;
  Game.explosion = Game.add.sprite(bullet.x, bullet.y, `${Game.model.charSelect}Bullet`);
  Game.explosion.anims.play(`${Game.model.charSelect}BulletExplosion`);
  Game.time.delayedCall(5, kill, [bullet], this);
  Game.time.delayedCall(250, kill, [Game.explosion], this);
};

export const killPlayer = (bullet, object) => {
  const { Game } = window.game.scene.keys;
  Game.playerDead = true;
  Game.time.delayedCall(25, explode, [object], this);
  Game.time.delayedCall(2500, gameReset, [Game], this);
};

export const chasePlayer = (enemy) => {
  const { Game } = window.game.scene.keys;

  if (enemy.x >= Game.player.x) {
    enemy.body.setVelocityX(-150);
    enemy.anims.play(`${Game.enemySelect}ShootLeft`);
    enemy.direction = 'left';
  } else {
    enemy.body.setVelocityX(150);
    enemy.anims.play(`${Game.enemySelect}Shoot`);
    enemy.direction = 'right';
  }

  if ((enemy.y - Game.player.y) > 35) {
    enemy.body.setVelocityY(-330);
  }
  if (Phaser.Math.Difference(enemy.x, Game.player.x) < 50) {
    enemy.body.x = Game.player.x + Phaser.Math.Between(-200, 200);
  }

  if (Game.shootTimer % 75 === 0) {
    Game.enemyBullet = new Artillery(Game, enemy.x,
      enemy.y - Game.enemyGunHeight, `${Game.enemySelect}Bullet`);
    Game.physics.add.collider(Game.enemyBullet, Game.player,
      killPlayer, null, Game);
    if (enemy.direction === 'left') {
      Game.enemyBullet.body.setVelocity(-300, 0);
    } else {
      Game.enemyBullet.body.setVelocity(300, 0);
    }
    Game.time.delayedCall(2250, kill, [Game.enemyBullet, ''], Game);
  }
};
