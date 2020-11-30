// import {
//   chasePlayer
// } from '/src/Helpers/gameLogic.js'

export class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, player) {
    super(scene, x, y, key);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scene.physics.world.enableBody(this, 0);
    this.body.setBounce(0.1);
    this.body.setCollideWorldBounds(true);
    this.body.setAllowGravity(true);

    // if (player) {
    //   console.log(this.body)
    // this.scene.physics.add.collider(enemies, ground, moveToObject, null, this);
    // this.scene.physics.add.collider(enemies, platforms, moveToObject, null, this);
    // this.scene.physics.moveToObject(player.body, this.body, 150);
    // this.on('collide'), this.chasePlayer, this;
    // }
    this.scene.add.existing(this);
  }

  // chasePlayer() {
  //   console.log(this.body)
  //   this.scene.physics.moveToObject(player.body, this, 150);
  // }

}