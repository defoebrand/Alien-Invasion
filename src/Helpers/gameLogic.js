import Artillery from '../Objects/Artillery'

export const chasePlayer = (enemy) => {
  let thisScene = window.game.scene.scenes[7];

  if (enemy.x >= thisScene.player.x) {
    enemy.body.setVelocityX(-150)
    enemy.anims.play('enemyShootLeft')
    enemy.direction = 'left'
  } else {
    enemy.body.setVelocityX(150)
    enemy.anims.play('enemyShoot')
    enemy.direction = 'right'
  }

  if (Phaser.Math.Difference(enemy.x, thisScene.player.x) < 5) {
    enemy.body.x = thisScene.player.x + Phaser.Math.Between(-300, 300);
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

export const gameReset = () => {
  // console.log(window.game.scene.scenes)
  window.game.scene.start('GameOver');

}

export const explode = (bullet, object) => {
  bullet.defaultPipeline.game.anims.play(`${window.game.scene.scenes[7].model.charSelect}BulletExplosion`);
  window.game.scene.scenes[7].time.delayedCall(250, kill, [bullet, ''], this);
}

export const destroyEnemy = (bullet, object) => {
  let thisScene = window.game.scene.scenes[7];
  thisScene.explosion = thisScene.add.sprite(object.x, object.y, `${thisScene.model.charSelect}Bullet`)
  thisScene.explosion.anims.play('playerExplosion')
  object.destroy()
  bullet.anims.play('playerExplosion');
  window.game.scene.scenes[7].time.delayedCall(250, kill, [bullet, thisScene.explosion], this);
}

export const killPlayer = (bullet, object) => {
  let thisScene = window.game.scene.scenes[7];
  thisScene.explosion = thisScene.add.sprite(object.x, object.y, `${thisScene.model.charSelect}Bullet`)
  thisScene.explosion.anims.play('playerExplosion')
  object.destroy()
  bullet.anims.play('playerExplosion');
  window.game.scene.scenes[7].time.delayedCall(250, kill, [bullet, thisScene.explosion], this);
  thisScene.playerDead = true
}

export const kill = (objectOne, objectTwo) => {
  objectOne.destroy();
  if (objectTwo) {
    objectTwo.destroy();
  }
}