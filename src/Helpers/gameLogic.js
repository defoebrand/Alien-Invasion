import Artillery from '../Objects/Artillery'

export const chasePlayer = (enemy) => {
  let thisScene = window.game.scene.scenes[7];

  if (enemy.x >= thisScene.player.x) {
    enemy.body.setVelocityX(-150)
    enemy.anims.play(`${thisScene.enemySelect}ShootLeft`)
    enemy.direction = 'left'
  } else {
    enemy.body.setVelocityX(150)
    enemy.anims.play(`${thisScene.enemySelect}Shoot`)
    enemy.direction = 'right'
  }

  if ((enemy.y - thisScene.player.y) > 35) {
    enemy.body.setVelocityY(-330);
  }
  if (Phaser.Math.Difference(enemy.x, thisScene.player.x) < 50) {
    enemy.body.x = thisScene.player.x + Phaser.Math.Between(-200, 200);
  }

  if (thisScene.shootTimer % 75 === 0) {
    thisScene.enemyBullet = new Artillery(thisScene, enemy.x, enemy.y - thisScene.enemyGunHeight, `${thisScene.enemySelect}Bullet`)
    thisScene.physics.add.collider(thisScene.enemyBullet, thisScene.player, killPlayer, null, thisScene)
    if (enemy.direction === 'left') {
      thisScene.enemyBullet.body.setVelocity(-300, 0);
    } else {
      thisScene.enemyBullet.body.setVelocity(300, 0);
    }
    thisScene.time.delayedCall(2250, kill, [thisScene.enemyBullet, ''], thisScene);
  }
}

export const explode = (bullet, object) => {
  let thisScene = window.game.scene.scenes[7];
  thisScene.explosion = thisScene.add.sprite(bullet.x, bullet.y, `${thisScene.model.charSelect}Bullet`)
  thisScene.explosion.anims.play(`${thisScene.model.charSelect}BulletExplosion`)
  bullet.destroy();
  thisScene.time.delayedCall(50, kill, [thisScene.explosion, ''], this);
}

export const destroyEnemy = (bullet, object) => {
  let thisScene = window.game.scene.scenes[7];
  thisScene.explosion = thisScene.add.sprite(object.x, object.y, `${thisScene.model.charSelect}Bullet`)
  thisScene.explosion.anims.play(`${thisScene.model.charSelect}BulletExplosion`)
  object.destroy();
  thisScene.time.delayedCall(250, kill, [thisScene.explosion, bullet], this);
}

export const killPlayer = (bullet, object) => {
  let thisScene = window.game.scene.scenes[7];
  thisScene.playerDead = true
  thisScene.time.delayedCall(25, destroyEnemy, ['', object], this);
  thisScene.time.delayedCall(2500, gameReset, [thisScene], this);
}


export const kill = (objectOne, objectTwo) => {
  objectOne.destroy();
  if (objectTwo) {
    objectTwo.destroy();
  }
}

export const gameReset = (scene) => {
  scene.scene.start('GameOver');
}