export const chasePlayer = (enemy, player, scene) => {
  // this.model = this.sys.game.globals.model;

  // console.log(enemy.body)
  // console.log(player.body)
  scene.physics.add.moveToObject(enemy, player, 150);
}

export const destroyEnemies = (player, enemy) => {
  var explosion = this.physics.add.sprite(enemy.x, enemy.y, `${enemySelection}Explosion`);
  explosion.anims.play('playerExplosion');
  explosion.body.setAllowGravity(false);
  explosion.setVelocityX(50);
  bullet.disableBody(true, true);
  var explosionTimer = this.time.delayedCall(300, kill, [explosion, ''], this);

  enemy.setActive(false).setVisible(false)
  this.physics.world.disableBody(enemy);
  enemies.remove(enemy)

  round += 1;
  score += 10;
  scoreText.setText('Score: ' + score);
  time = 1500;
}

export const hitBomb = (player, bomb) => {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  bomb.anims.play('enemyExplosion');
  gameOver = true;
  var timer = this.time.delayedCall(1500, sceneGameOver, [], this);
}

export const sceneGameOver = () => {
  localStorage.setItem('previousScore', score);
  this.scene.start('GameOver');
}

export const gameReset = () => {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  var timer = this.time.delayedCall(1500, sceneGameOver, [], this);
}

export const explode = (bullet, object) => {
  bullet.anims.play('playerExplosion')
  var timer = this.time.delayedCall(300, kill, [bullet, ''], this);
}

export const destroy = (body, enemy) => {
  console.log(enemy)

  body.anims.play('playerExplosion');
  // enemy.gameObject.disableBody(true, true);
  // this.time.delayedCall(300, kill, [bullet, enemy], this);
  // var explosion = bullet.anims.play('playerExplosion')
  // var explosionTimer = this.time.delayedCall(300, kill, [bullet, object], this);
}

export const kill = (bullet, object) => {
  bullet.disableBody(true, true);
  if (object) {
    object.anims.play('playerExplosion');
    object.setActive(false).setVisible(false)
    bombs.remove(object)
    this.physics.world.disableBody(object);
  }
}