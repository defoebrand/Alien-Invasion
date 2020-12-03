import Phaser from 'phaser';
import Artillery from '../Objects/Artillery';

export const gameReset = (scene) => {
  scene.scene.start('GameOver');
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
  const thisScene = window.game.scene.keys.Game;
  thisScene.explosion = thisScene.add.sprite(bullet.x, bullet.y, `${thisScene.model.charSelect}Bullet`);
  thisScene.explosion.anims.play(`${thisScene.model.charSelect}BulletExplosion`);
  thisScene.time.delayedCall(5, kill, [bullet], this);
  thisScene.time.delayedCall(250, kill, [thisScene.explosion], this);
};

export const killPlayer = (bullet, object) => {
  const thisScene = window.game.scene.keys.Game;
  thisScene.playerDead = true;
  thisScene.time.delayedCall(25, explode, [object], this);
  thisScene.time.delayedCall(2500, gameReset, [thisScene], this);
};

export const chasePlayer = (enemy) => {
  const thisScene = window.game.scene.keys.Game;

  if (enemy.x >= thisScene.player.x) {
    enemy.body.setVelocityX(-150);
    enemy.anims.play(`${thisScene.enemySelect}ShootLeft`);
    enemy.direction = 'left';
  } else {
    enemy.body.setVelocityX(150);
    enemy.anims.play(`${thisScene.enemySelect}Shoot`);
    enemy.direction = 'right';
  }

  if ((enemy.y - thisScene.player.y) > 35) {
    enemy.body.setVelocityY(-330);
  }
  if (Phaser.Math.Difference(enemy.x, thisScene.player.x) < 50) {
    enemy.body.x = thisScene.player.x + Phaser.Math.Between(-200, 200);
  }

  if (thisScene.shootTimer % 75 === 0) {
    thisScene.enemyBullet = new Artillery(thisScene, enemy.x,
      enemy.y - thisScene.enemyGunHeight, `${thisScene.enemySelect}Bullet`);
    thisScene.physics.add.collider(thisScene.enemyBullet, thisScene.player,
      killPlayer, null, thisScene);
    if (enemy.direction === 'left') {
      thisScene.enemyBullet.body.setVelocity(-300, 0);
    } else {
      thisScene.enemyBullet.body.setVelocity(300, 0);
    }
    thisScene.time.delayedCall(2250, kill, [thisScene.enemyBullet, ''], thisScene);
  }
};
